import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { assertUserCanLaunchTestings, CreatedEntity } from 'src/tools';
import { Depromise, LaunchTestingDTO, UserAuthInfo } from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class LaunchedTestingUseCase {
  constructor(
    private readonly launchedTestingAccessScopeRepo: repo.LaunchedTestingAccessScopeRepo,
    private readonly launchedTestingRepo: repo.LaunchedTestingRepo,
    private readonly auestionInstanceRepo: repo.QuestionInstanceRepo,
    private readonly abstractTestingRepo: repo.AbstractTestingRepo,
    private readonly answerOptionInstanceRepo: repo.AnswerOptionInstanceRepo,
  ) {}

  async launchTesting(
    {
      abstractTestingId,
      educationalSpaceId,
      closingDate,
      openingDate,
      maximumAttemptDurationInMinutes,
      accessScopes,
    }: LaunchTestingDTO,
    user: UserAuthInfo,
  ): Promise<CreatedEntity<model.LaunchedTesting, 'id'>> {
    assertUserCanLaunchTestings(user, educationalSpaceId);

    const abstractTesting =
      await this.abstractTestingRepo.getOneByIdForLaunching(abstractTestingId);

    await this.assertAbstractTestingCanBeLaunched(
      abstractTesting,
      educationalSpaceId,
    );

    const launchedTesting =
      await this.launchedTestingRepo.createOneWithRelations({
        abstractTestingId,
        educationalSpaceId,
        launchedByUserId: user.id,
        closingDate,
        openingDate,
        maximumAttemptDurationInMinutes,
      });

    await this.launchedTestingAccessScopeRepo.createManyWithRelations(
      accessScopes.map(({ userGroupId, type }) => ({
        launchedTesting,
        userGroupId,
        type,
      })),
    );

    await this.auestionInstanceRepo.createManyWithRelations(
      abstractTesting.stages
        .flatMap(({ questions }) => questions)
        .map((abstractQuestion) => ({
          abstractQuestion,
          launchedTesting,
        })),
    );

    await this.answerOptionInstanceRepo.createManyWithRelations(
      abstractTesting.stages
        .flatMap(({ questions }) => questions)
        .flatMap(({ abstractAnswerOptions }) => abstractAnswerOptions)
        .map((abstractAnswerOption) => ({
          abstractAnswerOption,
          launchedTesting,
        })),
    );

    return launchedTesting;
  }

  private async assertAbstractTestingCanBeLaunched(
    abstractTesting: Depromise<
      ReturnType<repo.AbstractTestingRepo['getOneByIdForLaunching']>
    >,
    educationalSpaceId: number,
  ): Promise<void> {
    const canAbstractTestingBeLaunched =
      abstractTesting.isAvailableToLaunch &&
      (abstractTesting.isPublic ||
        abstractTesting.availableForLaunchInEducationalSpaces.some(
          (allowedEducationalSpace) =>
            allowedEducationalSpace.id === educationalSpaceId,
        ));

    if (!canAbstractTestingBeLaunched)
      throw new BadRequestException(
        messages.launchedTestings.wasntAddedToCatalog,
      );
  }
}
