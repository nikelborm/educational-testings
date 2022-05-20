import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AbstractTesting, EducationalSpace } from '.';

@Entity({ name: 'available_for_launch_testing' })
@Index(['abstractTesting', 'educationalSpace'], { unique: true })
export class AvailableForLaunchTesting {
  @ManyToOne(() => AbstractTesting, (abstractTesting) => abstractTesting, {
    nullable: false,
  })
  @JoinColumn({
    name: 'abstract_testing_id',
  })
  abstractTesting!: AbstractTesting;

  @Column({
    name: 'abstract_testing_id',
    primary: true,
    nullable: false,
  })
  abstractTestingId!: number;

  @ManyToOne(() => EducationalSpace, (educationalSpace) => educationalSpace, {
    nullable: false,
  })
  @JoinColumn({
    name: 'educational_space_id',
  })
  educationalSpace!: EducationalSpace;

  @Column({
    name: 'educational_space_id',
    primary: true,
    nullable: false,
  })
  educationalSpaceId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
