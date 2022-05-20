import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractTesting } from '.';

@Entity({ name: 'abstract_testing_stage' })
export class AbstractTestingStage {
  @PrimaryGeneratedColumn({ name: 'abstract_testing_stage_id' })
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
    () => AbstractTesting,
    (abstractTesting) => abstractTesting.stages,
    { nullable: false },
  )
  @JoinColumn({
    name: 'abstract_testing_id',
  })
  abstractTesting!: AbstractTesting;

  @Column({
    name: 'abstract_testing_id',
    nullable: false,
  })
  abstractTestingId!: number;

  @Column({
    name: 'order',
    nullable: false,
    unique: true,
    generated: 'increment',
  })
  order!: number;

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
