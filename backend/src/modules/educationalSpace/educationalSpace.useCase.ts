import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  CreateEducationalSpaceDTO,
  EducationalSpaceAccessScopeType,
  UserAuthInfo,
  UserGroupManagementAccessScopeType,
} from 'src/types';
import { EntityManager } from 'typeorm';
import { model, repo } from '../infrastructure';

@Injectable()
export class EducationalSpaceUseCase implements OnModuleDestroy, OnModuleInit {
  constructor(
    private readonly educationalSpaceRepo: repo.EducationalSpaceRepo,
    private readonly userGroupRepo: repo.UserGroupRepo,
    private readonly educationalSpaceAccessScopeRepo: repo.EducationalSpaceAccessScopeRepo,
    private readonly userGroupManagementAccessScopeRepo: repo.UserGroupManagementAccessScopeRepo,
    private readonly userToUserGroupRepo: repo.UserToUserGroupRepo,
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
    console.log(educationalSpaceDTO);
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
  ): Promise<model.EducationalSpace> {
    if (!user.userGroups.some((group) => group.educationalSpaceId === id))
      throw new BadRequestException(messages.educationalSpace.cantView);

    const educationalSpace = await this.educationalSpaceRepo.getOneById(id);

    return educationalSpace;
  }

  async getAllowedEducationalSpacesOf(userId: number): Promise<
    (Pick<model.EducationalSpace, 'id' | 'name' | 'description'> & {
      userGroups: Pick<model.UserGroup, 'id' | 'name'>[];
    })[]
  > {
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

  onModuleDestroy(): void {
    console.log('EducationalSpaceUseCase destroy');
  }

  onModuleInit(): void {
    console.log('EducationalSpaceUseCase init');
  }
}
