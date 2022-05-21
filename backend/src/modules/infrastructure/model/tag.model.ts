import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AnswerOptionIntoTagContribution } from '.';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn({ name: 'tag_id' })
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description!: string;

  // TODO: в не MVP сделать древесную структуру тематик

  @OneToMany(
    () => AnswerOptionIntoTagContribution,
    (answerOptionIntoTagContribution) => answerOptionIntoTagContribution.tag,
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
