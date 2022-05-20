import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { LaunchedTestingAccessScopeType } from 'src/types';
import { UserGroup, LaunchedTesting } from '.';

@Entity({ name: 'launched_testing_access_scope' })
@Unique(['userGroup', 'launchedTesting', 'type'])
export class LaunchedTestingAccessScope {
  @PrimaryGeneratedColumn({ name: 'launched_testing_access_scope_id' })
  id!: number;

  @ManyToOne(
    () => UserGroup,
    (userGroup) => userGroup.launchedTestingAccessScopes,
    { nullable: false },
  )
  @JoinColumn({
    name: 'user_group_id',
  })
  userGroup!: UserGroup;

  @Column({
    name: 'user_group_id',
    nullable: false,
  })
  userGroupId!: number;

  @ManyToOne(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.accessScopes,
    { nullable: false },
  )
  @JoinColumn({
    name: 'launched_testing_id',
  })
  launchedTesting!: LaunchedTesting;

  @Column({
    name: 'launched_testing_id',
    nullable: false,
  })
  launchedTestingId!: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: LaunchedTestingAccessScopeType,
    nullable: false,
  })
  type!: LaunchedTestingAccessScopeType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt!: Date;
}
