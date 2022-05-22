import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TestingAnalyticsModule, AbstractTesting } from '.';

@Entity({
  name: 'testing_analytics_module_to_abstract_testing',
})
export class TestingAnalyticsModuleToAbstractTesting {
  @ManyToOne(
    () => TestingAnalyticsModule,
    (testingAnalyticsModule) =>
      testingAnalyticsModule.testingAnalyticsModuleToAbstractTestingRelations,
    { nullable: false },
  )
  @JoinColumn({ name: 'testing_analytics_module_id' })
  testingAnalyticsModule!: TestingAnalyticsModule;

  @Column({
    name: 'testing_analytics_module_id',
    primary: true,
    nullable: false,
  })
  testingAnalyticsModuleId!: number;

  @ManyToOne(
    () => AbstractTesting,
    (abstractTesting) =>
      abstractTesting.testingAnalyticsModuleToAbstractTestingRelations,
    { nullable: false },
  )
  @JoinColumn({ name: 'abstract_testing_id' })
  abstractTesting!: AbstractTesting;

  @Column({
    name: 'abstract_testing_id',
    primary: true,
    nullable: false,
  })
  abstractTestingId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
