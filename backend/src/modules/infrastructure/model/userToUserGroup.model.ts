import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User, UserGroup } from '.';

@Entity({ name: 'user_to_user_group' })
@Index(['user', 'userGroup'], { unique: true })
export class UserToUserGroup {
  @ManyToOne(() => User, (user) => user.userToUserGroupRelations, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({
    name: 'user_id',
    primary: true,
    nullable: false,
  })
  userId!: number;

  @ManyToOne(
    () => UserGroup,
    (userGroup) => userGroup.userToUserGroupRelations,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_group_id' })
  userGroup!: UserGroup;

  @Column({
    name: 'user_group_id',
    primary: true,
    nullable: false,
  })
  userGroupId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
