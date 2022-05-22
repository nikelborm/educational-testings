import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  User,
  LaunchedTesting,
  AvailableForLaunchTesting,
  UserGroup,
  AbstractTesting,
} from '.';

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

  @ManyToMany(
    () => AbstractTesting,
    (abstractTesting) => abstractTesting.availableForLaunchInEducationalSpaces,
  )
  @JoinTable({
    name: 'available_for_launch_testing',
    joinColumn: { name: 'educational_space_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'abstract_testing_id',
      referencedColumnName: 'id',
    },
  })
  availableForLaunchTestings!: AbstractTesting[];

  @OneToMany(
    () => AvailableForLaunchTesting,
    (availableForLaunchTesting) => availableForLaunchTesting.educationalSpace,
  )
  availableForLaunchTestingRelations!: AvailableForLaunchTesting[];

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
