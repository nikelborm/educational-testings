import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { TestingAnalyticsModuleSupport } from 'src/types';

@Entity({ name: 'testing_analytics_module' })
export class TestingAnalyticsModule {
  @PrimaryGeneratedColumn({ name: 'testing_analytics_module_id' })
  id!: number;

  @Column({
    name: 'testing_analytics_module_uuid',
    type: 'uuid',
    nullable: false,
    unique: true,
  })
  uuid!: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'support',
    type: 'enum',
    enum: TestingAnalyticsModuleSupport,
    nullable: false,
  })
  support!: TestingAnalyticsModuleSupport;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
