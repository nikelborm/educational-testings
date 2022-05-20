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
} from '.';
import { AbstractTesting } from './abstractTesting.model';

@Entity({ name: 'launched_testing' })
export class LaunchedTesting {
  @PrimaryGeneratedColumn({ name: 'launched_testing_id' })
  id!: number;

  @ManyToOne(
    () => AbstractTesting,
    (abstractTesting) => abstractTesting.launchedTestings,
    { nullable: false },
  )
  @JoinColumn({
    name: 'abstract_testing_id',
  })
  abstractTesting!: AbstractTesting;

  @Column({
    nullable: false,
    name: 'abstract_testing_id',
  })
  abstractTestingId!: number;

  @ManyToOne(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.launchedTestings,
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

  @ManyToOne(() => User, (user) => user.createdAbstractTestings, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy!: User;

  @Column({
    name: 'created_by_user_id',
    nullable: false,
  })
  createdByUserId!: number;

  @Column({
    name: 'opening_date',
    type: 'timestamptz',
    nullable: true,
  })
  openingDate?: Date;

  @Column({
    name: 'closing_date',
    type: 'timestamptz',
    nullable: true,
  })
  closingDate?: Date;

  @Column({
    name: 'maximum_attempt_duration_in_minutes',
    nullable: true,
  })
  maximumAttemptDurationInMinutes?: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt?: Date;
}
