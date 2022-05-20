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
import { User, UserGroup } from '.';
import { LaunchedTesting } from './launchedTesting.model';

@Entity({ name: 'educational_space' })
export class EducationalSpace {
  @PrimaryGeneratedColumn({ name: 'educational_space_id' })
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

  @ManyToOne(() => User, (user) => user.createdEducationalSpaces, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy!: User;

  @Column({
    name: 'created_by_user_id',
    nullable: false,
  })
  createdByUserId!: number;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.educationalSpace)
  userGroups!: UserGroup[];

  @OneToMany(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.educationalSpace,
  )
  launchedTestings!: LaunchedTesting[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt?: Date;
}
