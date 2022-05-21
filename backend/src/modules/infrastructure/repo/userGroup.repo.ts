import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  createOneWithRelations,
  NewEntity,
  UpdatedEntity,
  updateOneWithRelations,
} from 'src/tools';
import { Repository } from 'typeorm';
import { UserGroup } from '../model';

@Injectable()
export class UserGroupRepo {
  constructor(
    @InjectRepository(UserGroup)
    private readonly repo: Repository<UserGroup>,
  ) {}

  async getOneById(id: number): Promise<UserGroup> {
    const userGroup = await this.repo.findOne({
      where: { id },
    });
    if (!userGroup)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'userGroup'),
      );
    return userGroup;
  }

  async updateOneWithRelations(
    updatedUserGroup: UpdatedEntity<UserGroup>,
  ): Promise<UserGroup> {
    return await updateOneWithRelations(
      this.repo,
      updatedUserGroup,
      'userGroup',
    );
  }

  async createOneWithRelations(
    newUserGroup: NewEntity<UserGroup>,
  ): Promise<UserGroup> {
    return await createOneWithRelations(this.repo, newUserGroup, 'userGroup');
  }

  async deleteMany(userGroupIds: number[]): Promise<void> {
    await this.repo.delete(userGroupIds);
  }
}
