import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import {
  assertUserCanLaunchTestings,
  doesUserHaveSpaceAccess,
} from 'src/tools';
import {
  AbstractTestingForPassingDTO,
  AddTestingToEducationalSpaceCatalogDTO,
  Depromise,
  EducationalSpaceAccessScopeType,
  GetAvailableForLaunchTestingsDTO,
  PublicAbstractTesting,
  UserAuthInfo,
  UserGroupManagementAccessScopeType,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class AbstractTestingUseCase {
  constructor(
    private readonly abstractTestingRepo: repo.AbstractTestingRepo,
    private readonly userGroupRepo: repo.UserGroupRepo,
    private readonly availableForLaunchTestingRepo: repo.AvailableForLaunchTestingRepo,
  ) {}

  async getAbstractTestingWithQuestions(
    abstractTestingId: number,
  ): Promise<AbstractTestingForPassingDTO> {
    return await this.abstractTestingRepo.getOneByIdForPassing(
      abstractTestingId,
    );
  }

  async getAbstractTestingForPublicDemoPassingById(
    abstractTestingId: number,
    user: UserAuthInfo,
  ): Promise<AbstractTestingForPassingDTO> {
    await this.assertUserHaveAccessToViewAbstractTesting(
      abstractTestingId,
      user,
    );

    return await this.getAbstractTestingWithQuestions(abstractTestingId);
  }

  async getPublicAbstractTestings(): Promise<PublicAbstractTesting[]> {
    return await this.abstractTestingRepo.getManyPublic();
  }

  async getAvailableToLaunchIn(
    educationalSpaceId: number,
    user: UserAuthInfo,
  ): Promise<GetAvailableForLaunchTestingsDTO> {
    assertUserCanLaunchTestings(user, educationalSpaceId, {
      canUserLaunchFor: 'somebody',
    });

    let availableForLaunchInGroups: Pick<model.UserGroup, 'id' | 'name'>[] = [];

    const canUserLaunchTestingsForAllGroups = doesUserHaveSpaceAccess(
      user,
      educationalSpaceId,
      EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
    );

    if (canUserLaunchTestingsForAllGroups) {
      availableForLaunchInGroups =
        await this.userGroupRepo.getManyByEducationalSpace(educationalSpaceId);
    } else {
      const availableForLaunchInGroupIds = user.userGroups
        .filter((group) => group.educationalSpaceId === educationalSpaceId)
        .flatMap(({ leaderInAccessScopes }) => leaderInAccessScopes)
        .filter(
          ({ type }) =>
            type === UserGroupManagementAccessScopeType.LAUNCH_TESTING,
        )
        .map(({ subordinateUserGroupId }) => subordinateUserGroupId);

      availableForLaunchInGroups = (
        await this.userGroupRepo.getManyByIds(availableForLaunchInGroupIds)
      ).map(({ id, name }) => ({ id, name }));
    }

    const availableForLaunchTestings =
      await this.abstractTestingRepo.getManyAvailableForLaunch(
        educationalSpaceId,
      );

    return { availableForLaunchTestings, availableForLaunchInGroups };
  }

  async addTestingToEducationalSpaceCatalog(
    educationalSpaceTestingCatalogEntry: AddTestingToEducationalSpaceCatalogDTO,
    user: UserAuthInfo,
  ): Promise<void> {
    const abstractTestings = await this.abstractTestingRepo.getManyCreatedBy(
      user.id,
    );

    this.assertUserCreateTesting(
      abstractTestings,
      educationalSpaceTestingCatalogEntry.abstractTestingId,
    );

    this.assertTestingWasntAlreadyAdded(
      abstractTestings,
      educationalSpaceTestingCatalogEntry,
    );

    this.asserUserCanAddOwnTestingsToSpace(
      user,
      educationalSpaceTestingCatalogEntry.educationalSpaceId,
    );

    await this.availableForLaunchTestingRepo.createOnePlain(
      educationalSpaceTestingCatalogEntry,
    );
  }

  private asserUserCanAddOwnTestingsToSpace(
    user: UserAuthInfo,
    educationalSpaceId: number,
  ): void {
    const canUserAddOwnTestingsToThisSpace = doesUserHaveSpaceAccess(
      user,
      educationalSpaceId,
      EducationalSpaceAccessScopeType.ADD_OWN_ABSTRACT_TESTINGS_INTO_EDUCATIONAL_SPACE_CATALOG,
    );

    if (!canUserAddOwnTestingsToThisSpace)
      throw new BadRequestException(
        messages.abstractTesting.cantBeAddedBecauseNoRights,
      );
  }

  private assertTestingWasntAlreadyAdded(
    abstractTestingsCreatedByUser: Depromise<
      ReturnType<repo.AbstractTestingRepo['getManyCreatedBy']>
    >,
    educationalSpaceTestingCatalogEntry: AddTestingToEducationalSpaceCatalogDTO,
  ): void {
    const wasTestingAlreadyAdded = abstractTestingsCreatedByUser.some(
      ({ availableForLaunchInEducationalSpaces, id }) =>
        educationalSpaceTestingCatalogEntry.abstractTestingId === id &&
        availableForLaunchInEducationalSpaces.some(
          ({ id: educationalSpaceId }) =>
            educationalSpaceTestingCatalogEntry.educationalSpaceId ===
            educationalSpaceId,
        ),
    );

    if (wasTestingAlreadyAdded)
      throw new BadRequestException(
        messages.abstractTesting.alreadyAddedToSpace,
      );
  }

  private assertUserCreateTesting(
    abstractTestingsCreatedByUser: Depromise<
      ReturnType<repo.AbstractTestingRepo['getManyCreatedBy']>
    >,
    abstractTestingId: number,
  ): void {
    const didUserCreateThisTesting = abstractTestingsCreatedByUser.some(
      ({ id }) => abstractTestingId === id,
    );

    if (!didUserCreateThisTesting)
      throw new BadRequestException(messages.user.didntCreateAbstractTesting);
  }

  private async assertUserHaveAccessToViewAbstractTesting(
    abstractTestingId: number,
    user: UserAuthInfo,
  ): Promise<void> {
    const abstractTesting =
      await this.abstractTestingRepo.getOneWithAvailableEducationalSpacesById(
        abstractTestingId,
      );

    const doesUserHaveAccessToViewAbstractTesting =
      abstractTesting.isReadyToUse &&
      (abstractTesting.isPublic ||
        abstractTesting.availableForLaunchInEducationalSpaces.some(
          (allowedEducationalSpace) =>
            user.userGroups.some(
              (group) =>
                group.educationalSpaceId === allowedEducationalSpace.id,
            ),
        ));

    if (!doesUserHaveAccessToViewAbstractTesting)
      throw new BadRequestException(
        messages.abstractTesting.cantViewWithoutAccess,
      );
  }
}
