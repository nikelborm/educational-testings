import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import {
  assertUserCanLaunchTestings,
  CreatedEntity,
  doesUserHaveTestingAccess,
} from 'src/tools';
import {
  Depromise,
  LaunchedTestingAccessScopeType,
  LaunchedTestingDTO,
  LaunchTestingDTO,
  UserAuthInfo,
} from 'src/types';
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

  async getLaunchedTestingById(
    id: number,
    user: UserAuthInfo,
  ): Promise<LaunchedTestingDTO> {
    const doesUserHaveRightsToViewAnalytics = doesUserHaveTestingAccess(
      user,
      id,
      LaunchedTestingAccessScopeType.VIEW_ANALYTICS,
    );
    const doesUserHaveRightsToMakeAttempts = doesUserHaveTestingAccess(
      user,
      id,
      LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
    );

    if (!doesUserHaveRightsToMakeAttempts && !doesUserHaveRightsToViewAnalytics)
      return await this.launchedTestingRepo.getOneByIdWithAbstractTesting(id);

    const launchedTesting = doesUserHaveRightsToViewAnalytics
      ? await this.launchedTestingRepo.getOneByIdWithNestedInstancesAndAttempts(
          id,
        )
      : await this.launchedTestingRepo.getOneByIdWithNestedInstances(id);

    return {
      ...launchedTesting,
      abstractTestingForPassingAndAnalytics: doesUserHaveRightsToMakeAttempts
        ? await this.abstractTestingUseCase.getAbstractTestingWithQuestions(
            launchedTesting.abstractTestingId,
          )
        : undefined,
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
      [...new Set(accessScopes.map(({ userGroupId }) => userGroupId))],
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
