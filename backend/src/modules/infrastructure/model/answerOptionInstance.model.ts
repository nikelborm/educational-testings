import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserGivenAnswer, AbstractAnswerOption, LaunchedTesting } from '.';

@Entity({ name: 'answer_option_instance' })
@Unique(['abstractAnswerOption', 'launchedTesting'])
export class AnswerOptionInstance {
  @PrimaryGeneratedColumn({ name: 'answer_option_instance_id' })
  id!: number;

  @ManyToOne(
    () => AbstractAnswerOption,
    (abstractAnswerOption) => abstractAnswerOption.instances,
    { nullable: false },
  )
  @JoinColumn({ name: 'abstract_answer_option_id' })
  abstractAnswerOption!: AbstractAnswerOption;

  @Column({
    name: 'abstract_answer_option_id',
    nullable: false,
  })
  abstractAnswerOptionId!: number;

  @ManyToOne(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.answerOptionInstances,
    { nullable: false },
  )
  @JoinColumn({ name: 'launched_testing_id' })
  launchedTesting!: LaunchedTesting;

  @OneToMany(
    () => UserGivenAnswer,
    (userGivenAnswer) => userGivenAnswer.answerOptionInstance,
  )
  chosenInAnswers!: UserGivenAnswer[];

  @Column({
    name: 'launched_testing_id',
    nullable: false,
  })
  launchedTestingId!: number;
}
