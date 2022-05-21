import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  EducationalSpace,
  User,
  AbstractTesting,
  LaunchedTestingAccessScope,
  TestingAttempt,
  QuestionInstance,
  AnswerOptionInstance,
} from '.';

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

  @ManyToOne(() => User, (user) => user.didLaunchTestings, {
    nullable: false,
  })
  @JoinColumn({ name: 'launched_by_user_id' })
  launchedBy!: User;

  @Column({
    name: 'launched_by_user_id',
    nullable: false,
  })
  launchedByUserId!: number;

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

  @OneToMany(
    () => LaunchedTestingAccessScope,
    (launchedTestingAccessScope) => launchedTestingAccessScope.launchedTesting,
  )
  accessScopes!: LaunchedTestingAccessScope[];

  @OneToMany(
    () => TestingAttempt,
    (testingAttempt) => testingAttempt.launchedTesting,
  )
  testingAttempts!: TestingAttempt[];

  @OneToMany(
    () => QuestionInstance,
    (questionInstance) => questionInstance.launchedTesting,
  )
  questionInstances!: QuestionInstance[];

  @OneToMany(
    () => AnswerOptionInstance,
    (answerOptionInstance) => answerOptionInstance.launchedTesting,
  )
  answerOptionInstances!: AnswerOptionInstance[];

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
