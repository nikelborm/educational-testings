import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractQuestionAnswerType } from 'src/types';
import { AbstractTestingStage } from '.';

@Entity({ name: 'abstract_question' })
export class AbstractQuestion {
  @PrimaryGeneratedColumn({ name: 'abstract_question_id' })
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
    name: 'is_required',
    nullable: false,
  })
  isRequired!: boolean;

  @Column({
    name: 'order',
    nullable: false,
    unique: true,
    generated: 'increment',
  })
  order!: number;

  @ManyToOne(
    () => AbstractTestingStage,
    (abstractTestingStage) => abstractTestingStage.questions,
    { nullable: false },
  )
  @JoinColumn({
    name: 'abstract_testing_stage_id',
  })
  abstractTestingStage!: AbstractTestingStage;

  @Column({
    name: 'abstract_testing_stage_id',
    nullable: false,
  })
  abstractTestingStageId!: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AbstractQuestionAnswerType,
    nullable: false,
  })
  answerType!: AbstractQuestionAnswerType;

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
