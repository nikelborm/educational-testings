import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  EducationalSpace,
  User,
  AvailableForLaunchTesting,
  LaunchedTesting,
  AbstractTestingStage,
  TestingAnalyticsModuleToAbstractTesting,
  TestingAnalyticsModule,
} from '.';

@Entity({ name: 'abstract_testing' })
export class AbstractTesting {
  @PrimaryGeneratedColumn({ name: 'abstract_testing_id' })
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

  @Column({
    name: 'goal',
    nullable: false,
  })
  goal!: string;

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
    name: 'is_ready_to_use',
    nullable: false,
    default: false,
  })
  isReadyToUse!: boolean;

  @Column({
    name: 'is_public',
    nullable: false,
    default: false,
  })
  isPublic!: boolean;

  @ManyToMany(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.availableForLaunchTestings,
  )
  availableForLaunchInEducationalSpaces!: EducationalSpace[];

  @OneToMany(
    () => AvailableForLaunchTesting,
    (availableForLaunchTesting) => availableForLaunchTesting.abstractTesting,
  )
  availableForLaunchTestingRelations!: AvailableForLaunchTesting[];

  @OneToMany(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.abstractTesting,
  )
  launchedTestings!: LaunchedTesting[];

  @OneToMany(
    () => AbstractTestingStage,
    (abstractTestingStage) => abstractTestingStage.abstractTesting,
  )
  stages!: AbstractTestingStage[];

  @OneToMany(
    () => TestingAnalyticsModuleToAbstractTesting,
    (testingAnalyticsModuleToAbstractTesting) =>
      testingAnalyticsModuleToAbstractTesting.abstractTesting,
  )
  testingAnalyticsModuleToAbstractTestingRelations!: TestingAnalyticsModuleToAbstractTesting[];

  @ManyToMany(
    () => TestingAnalyticsModule,
    (testingAnalyticsModule) => testingAnalyticsModule.abstractTestings,
  )
  @JoinTable({
    name: 'testing_analytics_module_to_abstract_testing',
    joinColumn: {
      name: 'abstract_testing_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'testing_analytics_module_id',
      referencedColumnName: 'id',
    },
  })
  analyticsModules!: TestingAnalyticsModule[];

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
