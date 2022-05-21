import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { AnswerOptionInstance, TestingAttempt } from '.';

@Entity({ name: 'user_given_answer' })
@Unique(['answerOptionInstance', 'testingAttempt'])
export class UserGivenAnswer {
  @PrimaryGeneratedColumn({ name: 'user_given_answer_id' })
  id!: number;

  @ManyToOne(
    () => AnswerOptionInstance,
    (answerOptionInstance) => answerOptionInstance.chosenInAnswers,
    { nullable: false },
  )
  @JoinColumn({
    name: 'answer_option_instance_id',
  })
  answerOptionInstance!: AnswerOptionInstance;

  @Column({
    name: 'answer_option_instance_id',
    nullable: false,
  })
  answerOptionInstanceId!: number;

  @ManyToOne(
    () => TestingAttempt,
    (testingAttempt) => testingAttempt.givenAnswers,
    { nullable: false },
  )
  @JoinColumn({ name: 'testing_attempt_id' })
  testingAttempt!: TestingAttempt;

  @Column({
    name: 'testing_attempt_id',
    nullable: false,
  })
  testingAttemptId!: number;

  @Column({
    name: 'free_field_answer',
    nullable: true,
  })
  freeFieldAnswer?: string;

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
