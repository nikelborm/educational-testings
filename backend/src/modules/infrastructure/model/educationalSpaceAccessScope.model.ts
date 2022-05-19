import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EducationalSpaceAccessScopeType } from 'src/types';
import { UserGroup } from '.';

@Entity({ name: 'educational_space_access_scope' })
export class EducationalSpaceAccessScope {
  @PrimaryGeneratedColumn({ name: 'educational_space_access_scope_id' })
  id!: number;

  @ManyToOne(
    () => UserGroup,
    (userGroup) => userGroup.educationalSpaceAccessScopes,
    { nullable: false },
  )
  @JoinColumn({
    name: 'user_group_id',
  })
  userGroup!: UserGroup;

  @Column({
    name: 'user_group_id',
    nullable: false,
  })
  userGroupId!: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: EducationalSpaceAccessScopeType,
    nullable: false,
  })
  type!: EducationalSpaceAccessScopeType;

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
