import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import {
  assertUserCanLaunchTestings,
  doesUserHaveSpaceAccess,
} from 'src/tools';
import {
  AddTestingToEducationalSpaceCatalogDTO,
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
      user.userGroups.filter(
        ({ educationalSpaceId: id }) => id === educationalSpaceId,
      ),
      EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
    );

    if (canUserLaunchTestingsForAllGroups) {
      availableForLaunchInGroups =
        await this.userGroupRepo.getManyByEducationalSpace(educationalSpaceId);
    } else {
      const availableForLaunchInGroupIds = user.userGroups
        .flatMap(({ leaderInAccessScopes }) => leaderInAccessScopes)
        .filter(
          ({ type }) =>
            type === UserGroupManagementAccessScopeType.LAUNCH_TESTING,
        )
        .map(({ subordinateUserGroupId }) => subordinateUserGroupId);
      availableForLaunchInGroups = await this.userGroupRepo.getManyByIds(
        availableForLaunchInGroupIds,
      );
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

    const didUserCreateThisTesting = abstractTestings.find(
      ({ id }) => educationalSpaceTestingCatalogEntry.abstractTestingId === id,
    );

    if (!didUserCreateThisTesting)
      throw new BadRequestException(messages.user.didntCreateAbstractTesting);

    const wasTestingAlreadyAdded = abstractTestings.some(
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

    const canUserAddOwnTestingsToThisSpace = user.userGroups.some(
      (group) =>
        group.educationalSpaceId ===
          educationalSpaceTestingCatalogEntry.educationalSpaceId &&
        group.educationalSpaceAccessScopes.some(
          ({ type }) =>
            type ===
            EducationalSpaceAccessScopeType.ADD_OWN_ABSTRACT_TESTINGS_INTO_EDUCATIONAL_SPACE_CATALOG,
        ),
    );

    if (!canUserAddOwnTestingsToThisSpace)
      throw new BadRequestException(
        messages.abstractTesting.cantBeAddedBecauseNoRights,
      );

    await this.availableForLaunchTestingRepo.createOnePlain(
      educationalSpaceTestingCatalogEntry,
    );
  }
}
