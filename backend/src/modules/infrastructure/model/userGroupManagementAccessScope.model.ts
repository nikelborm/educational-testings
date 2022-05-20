import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserGroupManagementAccessScopeType } from 'src/types';
import { UserGroup } from '.';

@Entity({ name: 'user_group_management_access_scope' })
@Unique(['leaderUserGroup', 'subordinateUserGroup', 'type'])
export class UserGroupManagementAccessScope {
  @PrimaryGeneratedColumn({ name: 'user_group_management_access_scope_id' })
  id!: number;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.leaderInAccessScopes, {
    nullable: false,
  })
  @JoinColumn({
    name: 'leader_user_group_id',
  })
  leaderUserGroup!: UserGroup;

  @Column({
    name: 'leader_user_group_id',
    nullable: false,
  })
  leaderUserGroupId!: number;

  @ManyToOne(
    () => UserGroup,
    (userGroup) => userGroup.subordinateInAccessScopes,
    { nullable: false },
  )
  @JoinColumn({
    name: 'subordinate_user_group_id',
  })
  subordinateUserGroup!: UserGroup;

  @Column({
    name: 'subordinate_user_group_id',
    nullable: false,
  })
  subordinateUserGroupId!: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserGroupManagementAccessScopeType,
    nullable: false,
  })
  type!: UserGroupManagementAccessScopeType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
