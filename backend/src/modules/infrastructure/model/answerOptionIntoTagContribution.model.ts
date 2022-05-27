import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractAnswerOption, Tag } from '.';

@Entity({ name: 'answer_option_into_tag_contribution' })
export class AnswerOptionIntoTagContribution {
  @PrimaryGeneratedColumn({ name: 'answer_option_into_tag_contribution_id' })
  id!: number;

  @ManyToOne(
    () => AbstractAnswerOption,
    (abstractAnswerOption) => abstractAnswerOption.contributions,
    { nullable: false },
  )
  @JoinColumn({
    name: 'abstract_answer_option_id',
  })
  abstractAnswerOption!: AbstractAnswerOption;

  @Column({
    name: 'abstract_answer_option_id',
    nullable: false,
  })
  abstractAnswerOptionId!: number;

  @ManyToOne(() => Tag, (tag) => tag, { nullable: false })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag;

  @Column({
    name: 'tag_id',
    nullable: false,
  })
  tagId!: number;

  @Column({
    type: 'real',
    name: 'weight',
    nullable: false,
  })
  weight!: number;

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
