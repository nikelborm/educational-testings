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
import { User } from '.';
import { LaunchedTesting } from './launchedTesting.model';

@Entity({ name: 'abstract_testing' })
export class AbstractTesting {
  @PrimaryGeneratedColumn({ name: 'abstract_testing_id' })
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
    name: 'goal',
    nullable: false,
  })
  goal!: string;

  @ManyToOne(() => User, (user) => user.createdAbstractTestings, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy!: User;

  @Column({
    name: 'created_by_user_id',
    nullable: false,
  })
  createdByUserId!: number;

  @Column({
    name: 'is_available_to_launch',
    nullable: false,
    default: false,
  })
  isAvailableToLaunch!: boolean;

  @Column({
    name: 'is_public',
    nullable: false,
    default: false,
  })
  isPublic!: boolean;

  @OneToMany(
    () => LaunchedTesting,
    (launchedTesting) => launchedTesting.abstractTesting,
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
    nullable: true,
  })
  updatedAt?: Date;
}
