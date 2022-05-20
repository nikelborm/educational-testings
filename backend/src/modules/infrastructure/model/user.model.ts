import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import {
  EducationalSpace,
  UserGroup,
  UserToUserGroup,
  AbstractTesting,
  LaunchedTesting,
} from '.';
import { TestingAttempt } from './testingAttempt.model';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  lastName!: string;

  @Column({
    name: 'patronymic',
    nullable: false,
  })
  patronymic!: string;

  @Column({
    name: 'gender',
    nullable: false,
  })
  gender!: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone?: string;

  @Column({
    name: 'salt',
    select: false,
    nullable: false,
  })
  salt!: string;

  @Column({
    name: 'password_hash',
    select: false,
    nullable: false,
  })
  passwordHash!: string;

  @OneToMany(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.createdBy,
  )
  createdEducationalSpaces!: EducationalSpace[];

  @OneToMany(
    () => AbstractTesting,
    (abstractTesting) => abstractTesting.createdBy,
  )
  createdAbstractTestings!: AbstractTesting[];

  @OneToMany(() => UserToUserGroup, (userToUserGroup) => userToUserGroup.user)
  userToUserGroupRelations!: UserToUserGroup[];

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.users)
  @JoinTable({
    name: 'user_to_user_group',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'user_group_id' },
  })
  userGroups!: UserGroup[];

  @OneToMany(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.launchedBy,
  )
  didLaunchTestings!: LaunchedTesting[];

  @OneToMany(() => TestingAttempt, (testingAttempt) => testingAttempt.user)
  testingAttempts!: TestingAttempt[];

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
