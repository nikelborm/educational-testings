import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { model, repo } from '../infrastructure';
import { messages } from 'src/config';
import {
  ConfigKeys,
  CreateEducationalSpaceDTO,
  EducationalSpaceAccessScopeType,
  EducationalSpaceResponseDTO,
  IAppConfigMap,
  MyEducationalSpacesDTO,
  UserAuthInfo,
  UserAuthInfoTrimmedUserGroup,
  UserGroupManagementAccessScopeType,
} from 'src/types';
import { doesUserHaveSpaceAccess } from 'src/tools';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EducationalSpaceUseCase implements OnModuleDestroy, OnModuleInit {
  constructor(
    private readonly educationalSpaceRepo: repo.EducationalSpaceRepo,
    private readonly userGroupRepo: repo.UserGroupRepo,
    private readonly educationalSpaceAccessScopeRepo: repo.EducationalSpaceAccessScopeRepo,
    private readonly testingAttemptRepo: repo.TestingAttemptRepo,
    private readonly userGroupManagementAccessScopeRepo: repo.UserGroupManagementAccessScopeRepo,
    private readonly userToUserGroupRepo: repo.UserToUserGroupRepo,
    private readonly configService: ConfigService<IAppConfigMap, true>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // async createEducationalSpace(
  //   educationalSpaceDTO: CreateEducationalSpaceDTO,
  //   user: { id: number; canCreateEducationalSpaces: boolean },
  // ): Promise<void> {
  //   return await this.entityManager.transaction(async (transactionManager) => {
  //     return await this.createEducationalSpaceWithTransactionManager(
  //       transactionManager,
  //       educationalSpaceDTO,
  //       user,
  //     );
  //   });
  // }

  async createEducationalSpace(
    // transactionManager: EntityManager,
    educationalSpaceDTO: CreateEducationalSpaceDTO,
    userCreator: { id: number; canCreateEducationalSpaces: boolean },
  ): Promise<{
    educationalSpace: model.EducationalSpace;
    spaceOwnersGroup: model.UserGroup;
    teachersGroup: model.UserGroup;
    studentsGroup: model.UserGroup;
  }> {
    if (!userCreator.canCreateEducationalSpaces)
      throw new BadRequestException(messages.user.cantCreateEducationalSpace);

    const educationalSpace =
      await this.educationalSpaceRepo.createOneWithRelations({
        ...educationalSpaceDTO,
        createdByUserId: userCreator.id,
      });

    const [spaceOwnersGroup, teachersGroup, studentsGroup] =
      (await this.userGroupRepo.createManyWithRelations([
        {
          name: 'Владельцы пространства',
          educationalSpace,
          userToUserGroupRelations: [{ userId: userCreator.id }],
          createdBy: userCreator,
        },
        {
          name: 'Преподаватели',
          educationalSpace,
          createdBy: userCreator,
        },
        {
          name: 'Студенты',
          educationalSpace,
          createdBy: userCreator,
        },
      ])) as [model.UserGroup, model.UserGroup, model.UserGroup];

    await this.educationalSpaceAccessScopeRepo.createManyWithRelations([
      ...[
        EducationalSpaceAccessScopeType.ADD_OWN_ABSTRACT_TESTINGS_INTO_EDUCATIONAL_SPACE_CATALOG,
        EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
        EducationalSpaceAccessScopeType.MODIFY_SPACE_INFO,
        EducationalSpaceAccessScopeType.MODIFY_USER_GROUPS,
        EducationalSpaceAccessScopeType.VIEW_LAUNCHED_TESTINGS,
        EducationalSpaceAccessScopeType.VIEW_USER_GROUPS,
      ].map((type) => ({
        userGroup: spaceOwnersGroup,
        type,
      })),
      {
        userGroup: teachersGroup,
        type: EducationalSpaceAccessScopeType.VIEW_LAUNCHED_TESTINGS,
      },
    ]);

    await this.userGroupManagementAccessScopeRepo.createManyWithRelations([
      {
        leaderUserGroup: teachersGroup,
        subordinateUserGroup: teachersGroup,
        type: UserGroupManagementAccessScopeType.VIEW_USERS,
      },
      {
        leaderUserGroup: teachersGroup,
        subordinateUserGroup: studentsGroup,
        type: UserGroupManagementAccessScopeType.INVITE_USERS,
      },
      {
        leaderUserGroup: teachersGroup,
        subordinateUserGroup: studentsGroup,
        type: UserGroupManagementAccessScopeType.VIEW_USERS,
      },
      {
        leaderUserGroup: teachersGroup,
        subordinateUserGroup: studentsGroup,
        type: UserGroupManagementAccessScopeType.REMOVE_USERS,
      },
      {
        leaderUserGroup: studentsGroup,
        subordinateUserGroup: studentsGroup,
        type: UserGroupManagementAccessScopeType.VIEW_USERS,
      },
    ]);

    return {
      educationalSpace: educationalSpace as model.EducationalSpace,
      spaceOwnersGroup,
      teachersGroup,
      studentsGroup,
    };
  }

  async getOneBy(
    id: number,
    user: UserAuthInfo,
  ): Promise<EducationalSpaceResponseDTO> {
    const userGroupsFromThisSpace = user.userGroups.filter(
      (group) => group.educationalSpaceId === id,
    );

    if (!userGroupsFromThisSpace.length)
      throw new BadRequestException(messages.educationalSpace.cantView);

    const filterForLaunchedTestingIds =
      await this.getLaunchedTestingIdssUserHaveAccessTo(
        user.id,
        id,
        userGroupsFromThisSpace,
      );

    const filterForUserGroupIds = this.getUserGroupIdsUserShouldKnowAbout(
      userGroupsFromThisSpace,
    );

    const educationalSpace = await this.educationalSpaceRepo.getOneById(id, {
      filterForLaunchedTestingIds,
      filterForUserGroupIds,
    });

    const canUserInviteToAnyGroup = doesUserHaveSpaceAccess(
      userGroupsFromThisSpace,
      EducationalSpaceAccessScopeType.MODIFY_USER_GROUPS,
    );

    return {
      ...educationalSpace,
      userGroups: educationalSpace.userGroups.map((group) => {
        const canUserInviteToThisGroup = user.userGroups.some((userGroup) =>
          userGroup.leaderInAccessScopes.some(
            (scope) =>
              scope.subordinateUserGroupId === group.id &&
              scope.type === UserGroupManagementAccessScopeType.INVITE_USERS,
          ),
        );

        if (!canUserInviteToThisGroup && !canUserInviteToAnyGroup) return group;
        const expirationDate = new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        ).toISOString(); // + 1 day

        return {
          ...group,
          inviteLinkPayload: {
            expirationDate,
            givenByUserId: user.id,
            inviteToUserGroupId: group.id,
            signature: createHash('sha256')
              .update(
                this.configService.get(ConfigKeys.INVITE_USERS_SIGN_KEY, {
                  infer: true,
                }),
              )
              .update(`${user.id}_${group.id}_${expirationDate}`)
              .digest('hex'),
          },
        };
      }),
    };
  }

  async getAllowedEducationalSpacesOf(
    userId: number,
  ): Promise<MyEducationalSpacesDTO[]> {
    const userToUserGroups =
      await this.userToUserGroupRepo.findWithUserGroupWithSimpleEducationalSpaceBy(
        userId,
      );
    const educationalSpaces: model.EducationalSpace[] = [];
    for (const {
      userGroup: { id, name, educationalSpace },
    } of userToUserGroups) {
      const previouslyPushedSpace = educationalSpaces.find(
        (space) => space.id === educationalSpace.id,
      );

      if (previouslyPushedSpace) {
        previouslyPushedSpace.userGroups.push({ id, name } as model.UserGroup);
      } else {
        educationalSpaces.push({
          ...educationalSpace,
          userGroups: [{ id, name } as model.UserGroup],
        });
      }
    }
    return educationalSpaces;
  }

  async useInviteLink(
    givenByUserId: number,
    inviteToUserGroupId: number,
    signature: string,

    user: UserAuthInfo,
  ): Promise<void> {
    console.log();
  }

  private async getLaunchedTestingIdssUserHaveAccessTo(
    userId: number,
    educationalSpaceId: number,
    userGroupsFromThisSpace: UserAuthInfoTrimmedUserGroup[],
  ): Promise<number[] | 'all'> {
    const canUserViewAllLaunchedTestings = doesUserHaveSpaceAccess(
      userGroupsFromThisSpace,
      EducationalSpaceAccessScopeType.VIEW_LAUNCHED_TESTINGS,
    );

    if (canUserViewAllLaunchedTestings) return 'all';

    const launchedTestingIdsWhereUserMadeAtLeastOneAttempt = (
      await this.testingAttemptRepo.findManyBy(userId, educationalSpaceId)
    ).map(({ launchedTesting: { id } }) => id);

    const launchedTestingIdsWhereUserHaveAtLeastOneAccessScope =
      userGroupsFromThisSpace
        .flatMap(
          ({ launchedTestingAccessScopes }) => launchedTestingAccessScopes,
        )
        .map(({ launchedTestingId }) => launchedTestingId);

    return [
      ...new Set([
        ...launchedTestingIdsWhereUserMadeAtLeastOneAttempt,
        ...launchedTestingIdsWhereUserHaveAtLeastOneAccessScope,
      ]),
    ];
  }

  private getUserGroupIdsUserShouldKnowAbout(
    userGroupsFromThisSpace: UserAuthInfoTrimmedUserGroup[],
  ): number[] | 'all' {
    const canUserViewAllUserGroups = doesUserHaveSpaceAccess(
      userGroupsFromThisSpace,
      EducationalSpaceAccessScopeType.VIEW_USER_GROUPS,
    );

    if (canUserViewAllUserGroups) return 'all';

    const userGroupIdsOfUser = userGroupsFromThisSpace.map(({ id }) => id);

    const userGroupIdsWhereUserCanUseManagementScopes = userGroupsFromThisSpace
      .flatMap(({ leaderInAccessScopes }) => leaderInAccessScopes)
      .map(({ subordinateUserGroupId }) => subordinateUserGroupId);

    return [
      ...new Set([
        ...userGroupIdsOfUser,
        ...userGroupIdsWhereUserCanUseManagementScopes,
      ]),
    ];
  }

  onModuleDestroy(): void {
    console.log('EducationalSpaceUseCase destroy');
  }

  onModuleInit(): void {
    console.log('EducationalSpaceUseCase init');
  }
}
