import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { AccessScope, UserToAccessScope } from '.';
import { EducationalSpace } from './educationalSpace.model';
import { UserGroup } from './userGroup.model';
import { UserToUserGroup } from './userToUserGroup.model';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  lastName!: string;

  @Column({
    name: 'patronymic',
    nullable: false,
  })
  patronymic!: string;

  @Column({
    name: 'gender',
    nullable: false,
  })
  gender!: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone!: string;

  @Column({
    name: 'salt',
    select: false,
    nullable: false,
  })
  salt!: string;

  @Column({
    name: 'password_hash',
    select: false,
    nullable: false,
  })
  passwordHash!: string;

  @ManyToMany(() => AccessScope, (accessScope) => accessScope.users)
  @JoinTable({
    name: 'user_to_access_scope',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'access_scope_id' },
  })
  accessScopes!: AccessScope[];

  @OneToMany(
    () => UserToAccessScope,
    (userToAccessScope) => userToAccessScope.user,
  )
  userToAccessScopeRelations!: UserToAccessScope[];

  @OneToMany(
    () => EducationalSpace,
    (educationalSpace) => educationalSpace.createdBy,
  )
  createdEducationalSpaces!: EducationalSpace[];

  @OneToMany(() => UserToUserGroup, (userToUserGroup) => userToUserGroup.user)
  userToUserGroupRelations!: UserToUserGroup[];

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.users)
  @JoinTable({
    name: 'user_to_user_group',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'user_group_id' },
  })
  userGroups!: UserGroup[];

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
  updatedAt!: Date;
}
