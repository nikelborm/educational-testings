import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  AnswerOptionIntoTagContribution,
  AbstractQuestion,
  AnswerOptionInstance,
} from '.';

@Entity({ name: 'abstract_answer_option' })
export class AbstractAnswerOption {
  @PrimaryGeneratedColumn({ name: 'abstract_answer_option_id' })
  id!: number;

  @ManyToOne(
    () => AbstractQuestion,
    (abstractQuestion) => abstractQuestion.abstractAnswerOptions,
    { nullable: false },
  )
  @JoinColumn({
    name: 'abstract_question_id',
  })
  abstractQuestion!: AbstractQuestion;

  @Column({
    name: 'abstract_question_id',
    nullable: false,
  })
  abstractQuestionId!: number;

  @Column({
    name: 'is_free_field',
    nullable: false,
  })
  isFreeField!: boolean;

  @Column({
    name: 'answer',
    nullable: false,
  })
  answer!: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description?: string;

  @OneToMany(
    () => AnswerOptionInstance,
    (answerOptionInstance) => answerOptionInstance.abstractAnswerOption,
  )
  instances!: AnswerOptionInstance[];

  @OneToMany(
    () => AnswerOptionIntoTagContribution,
    (answerOptionIntoTagContribution) =>
      answerOptionIntoTagContribution.abstractAnswerOption,
  )
  contributions!: AnswerOptionIntoTagContribution[];

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
