import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AccessScope, UserToAccessScope } from '.';
import { EducationalSpace } from './educationalSpace.model';
import { User } from './user.model';
import { UserToUserGroup } from './userToUserGroup.model';

@Entity({ name: 'user_group' })
export class UserGroup {
  @PrimaryGeneratedColumn({ name: 'user_group_id' })
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

  @ManyToOne(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.userGroups,
    { nullable: false },
  )
  @JoinColumn({
    name: 'educational_space_id',
  })
  educationalSpace!: EducationalSpace;

  @Column({
    name: 'educational_space_id',
    nullable: false,
  })
  educationalSpaceId!: number;

  @OneToMany(
    () => UserToUserGroup,
    (userToUserGroup) => userToUserGroup.userGroup,
  )
  userToUserGroupRelations!: UserToUserGroup[];

  @ManyToMany(() => User, (user) => user.userGroups)
  users!: User[];

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
