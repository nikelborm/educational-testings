import { TestingAttemptStatus } from 'src/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User, LaunchedTesting } from '.';

@Entity({ name: 'testing_attempt' })
export class TestingAttempt {
  @PrimaryGeneratedColumn({ name: 'testing_attempt_id' })
  id!: number;

  @ManyToOne(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.testingAttempts,
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

  @ManyToOne(() => User, (user) => user.testingAttempts, {
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId!: number;

  @Column({
    name: 'finished_at_date',
    type: 'timestamptz',
    nullable: true,
  })
  finishedAt?: Date;

  @Column({
    name: 'last_saved_at_date',
    type: 'timestamptz',
    nullable: true,
  })
  lastSavedAt?: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TestingAttemptStatus,
    nullable: false,
  })
  status!: TestingAttemptStatus;

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
