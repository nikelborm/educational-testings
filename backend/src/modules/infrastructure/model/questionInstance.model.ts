import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AbstractQuestion, LaunchedTesting } from '.';

@Entity({ name: 'question_instance' })
@Unique(['abstractQuestion', 'launchedTesting'])
export class QuestionInstance {
  @PrimaryGeneratedColumn({ name: 'question_instance_id' })
  id!: number;

  @ManyToOne(
    () => AbstractQuestion,
    (abstractQuestion) => abstractQuestion.instances,
    { nullable: false },
  )
  @JoinColumn({ name: 'abstract_question_id' })
  abstractQuestion!: AbstractQuestion;

  @Column({
    name: 'abstract_question_id',
    nullable: false,
  })
  abstractQuestionId!: number;

  @ManyToOne(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.questionInstances,
    { nullable: false },
  )
  @JoinColumn({ name: 'launched_testing_id' })
  launchedTesting!: LaunchedTesting;

  @Column({
    name: 'launched_testing_id',
    nullable: false,
  })
  launchedTestingId!: number;
}
