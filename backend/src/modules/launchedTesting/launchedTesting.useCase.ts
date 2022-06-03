import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { assertUserCanLaunchTestings, CreatedEntity } from 'src/tools';
import {
  Depromise,
  LaunchedTestingAccessScopeType,
  LaunchTestingDTO,
  UserAuthInfo,
} from 'src/types';
import { DeepPartial } from 'typeorm';
import { AbstractTestingUseCase } from '../abstractTesting';
import { model, repo } from '../infrastructure';

@Injectable()
export class LaunchedTestingUseCase {
  constructor(
    private readonly launchedTestingAccessScopeRepo: repo.LaunchedTestingAccessScopeRepo,
    private readonly launchedTestingRepo: repo.LaunchedTestingRepo,
    private readonly auestionInstanceRepo: repo.QuestionInstanceRepo,
    private readonly abstractTestingRepo: repo.AbstractTestingRepo,
    private readonly answerOptionInstanceRepo: repo.AnswerOptionInstanceRepo,
    private readonly userGroupRepo: repo.UserGroupRepo,
    private readonly abstractTestingUseCase: AbstractTestingUseCase,
  ) {}

  async getLaunchedTestingByIdForPassing(
    launchedTestingId: number,
    user: UserAuthInfo,
  ): Promise<DeepPartial<model.LaunchedTesting>> {
    this.assertUserHaveAccessToPassLaunchedTesting(launchedTestingId, user);

    const launchedTesting =
      await this.launchedTestingRepo.getOneByIdWithNestedInstances(
        launchedTestingId,
      );

    const abstractTesting =
      await this.abstractTestingUseCase.getAbstractTestingWithQuestions(
        launchedTesting.abstractTestingId,
      );

    return {
      ...launchedTesting,
      abstractTesting,
    };
  }

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
    assertUserCanLaunchTestings(user, educationalSpaceId, {
      canUserLaunchFor: 'specificGroups',
      scopesToCheck: accessScopes,
    });

    await this.assertAllUserGroupsExistAndFromSpecifiedEducationalSpace(
      accessScopes.map(({ userGroupId }) => userGroupId),
      educationalSpaceId,
    );

    const abstractTesting =
      await this.abstractTestingRepo.getOneByIdForLaunching(abstractTestingId);

    this.assertAbstractTestingCanBeLaunched(
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

  private async assertAllUserGroupsExistAndFromSpecifiedEducationalSpace(
    userGroupIds: number[],
    educationalSpaceId: number,
  ): Promise<void> {
    const groups = await this.userGroupRepo.getManyByIds(userGroupIds);
    const spaceIds = new Set(groups.map((group) => group.educationalSpaceId));

    if (groups.length !== userGroupIds.length)
      throw new BadRequestException(messages.userGroup.notAllFound);

    if (spaceIds.size !== 1 || !spaceIds.has(educationalSpaceId))
      throw new BadRequestException(
        messages.userGroup.notFromSingleEducationalSpace,
      );
  }

  private assertUserHaveAccessToPassLaunchedTesting(
    launchedTestingIdToSearch: number,
    user: UserAuthInfo,
  ): void {
    this.assertUserHaveAccessScopeWithTypeInLaunchedTesting(
      launchedTestingIdToSearch,
      user,
      LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
    );
  }

  private assertUserHaveAccessScopeWithTypeInLaunchedTesting(
    launchedTestingIdToSearch: number,
    user: UserAuthInfo,
    typeOfWishedScope: LaunchedTestingAccessScopeType,
  ): void {
    const doesUserHaveAccessToPassLaunchedTesting = user.userGroups.some(
      (group) =>
        group.launchedTestingAccessScopes.some(
          ({ launchedTestingId, type }) =>
            launchedTestingId === launchedTestingIdToSearch &&
            type === typeOfWishedScope,
        ),
    );

    if (!doesUserHaveAccessToPassLaunchedTesting)
      throw new BadRequestException(
        messages.launchedTestings.wasntAddedToCatalog,
      );
  }

  private assertAbstractTestingCanBeLaunched(
    abstractTesting: Depromise<
      ReturnType<repo.AbstractTestingRepo['getOneByIdForLaunching']>
    >,
    educationalSpaceId: number,
  ): void {
    const canAbstractTestingBeLaunched =
      abstractTesting.isReadyToUse &&
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
