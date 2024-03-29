import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  EducationalSpace,
  EducationalSpaceAccessScope,
  User,
  UserToUserGroup,
  UserGroupManagementAccessScope,
  LaunchedTestingAccessScope,
} from '.';

@Entity({ name: 'user_group' })
export class UserGroup {
  @PrimaryGeneratedColumn({ name: 'user_group_id' })
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description?: string;

  @ManyToOne(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.userGroups,
    { nullable: false },
  )
  @JoinColumn({
    name: 'educational_space_id',
  })
  educationalSpace!: EducationalSpace;

  @Column({
    name: 'educational_space_id',
    nullable: false,
  })
  educationalSpaceId!: number;

  @OneToMany(
    () => UserToUserGroup,
    (userToUserGroup) => userToUserGroup.userGroup,
    { cascade: ['insert'] },
  )
  userToUserGroupRelations!: UserToUserGroup[];

  @ManyToMany(() => User, (user) => user.userGroups)
  users!: User[];

  @OneToMany(
    () => EducationalSpaceAccessScope,
    (educationalSpaceAccessScope) => educationalSpaceAccessScope.userGroup,
  )
  educationalSpaceAccessScopes!: EducationalSpaceAccessScope[];

  @OneToMany(
    () => UserGroupManagementAccessScope,
    (userGroupManagementAccessScope) =>
      userGroupManagementAccessScope.leaderUserGroup,
  )
  leaderInAccessScopes!: UserGroupManagementAccessScope[];

  @OneToMany(
    () => UserGroupManagementAccessScope,
    (userGroupManagementAccessScope) =>
      userGroupManagementAccessScope.subordinateUserGroup,
  )
  subordinateInAccessScopes!: UserGroupManagementAccessScope[];

  @OneToMany(
    () => LaunchedTestingAccessScope,
    (launchedTestingAccessScope) => launchedTestingAccessScope.userGroup,
  )
  launchedTestingAccessScopes!: LaunchedTestingAccessScope[];

  @ManyToOne(() => User, (user) => user.createdUserGroups, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy!: User;

  @Column({
    name: 'created_by_user_id',
    nullable: false,
  })
  createdByUserId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;
}
