import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatedEntity,
  CreatedPlainEntity,
  createOnePlain,
  createOneWithRelations,
  NewEntity,
  NewPlainEntity,
} from 'src/tools';
import { Repository } from 'typeorm';
import { UserToUserGroup } from '../model';

@Injectable()
export class UserToUserGroupRepo {
  constructor(
    @InjectRepository(UserToUserGroup)
    private readonly repo: Repository<UserToUserGroup>,
  ) {}

  async findWithUserGroupWithSimpleEducationalSpaceBy(
    userId: number,
  ): Promise<UserToUserGroup[]> {
    return await this.repo.find({
      where: {
        userId,
      },
      relations: {
        userGroup: {
          educationalSpace: true,
        },
      },
      select: {
        userGroup: {
          id: true,
          name: true,
          educationalSpace: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }

  async createOneWithRelations(
    newUserToUserGroup: NewEntity<UserToUserGroup, never>,
  ): Promise<CreatedEntity<UserToUserGroup, never>> {
    return await createOneWithRelations(this.repo, newUserToUserGroup);
  }

  async createOnePlain(
    newUserToUserGroup: NewPlainEntity<UserToUserGroup, never>,
  ): Promise<CreatedPlainEntity<UserToUserGroup, never>> {
    return await createOnePlain(this.repo, newUserToUserGroup);
  }
}
