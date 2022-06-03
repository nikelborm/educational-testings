import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  CreatedEntity,
  createManyWithRelations,
  createOneWithRelations,
  NewEntity,
  UpdateEntity,
  updateOneWithRelations,
} from 'src/tools';
import { In, Repository } from 'typeorm';
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

  async getManyByEducationalSpace(
    educationalSpaceId: number,
  ): Promise<Pick<UserGroup, 'id' | 'name'>[]> {
    return await this.repo.find({
      where: { educationalSpaceId },
      select: { id: true, name: true },
    });
  }

  async getManyByIds(
    ids: number[],
  ): Promise<Pick<UserGroup, 'id' | 'name' | 'educationalSpaceId'>[]> {
    if (!ids.length) return [];
    return await this.repo.find({
      where: { id: In(ids) },
      select: {
        id: true,
        name: true,
        educationalSpaceId: true,
      },
    });
  }

  async updateOneWithRelations(
    updatedUserGroup: UpdateEntity<UserGroup, 'id'>,
  ): Promise<UserGroup> {
    return await updateOneWithRelations<UserGroup, 'id'>(
      this.repo,
      updatedUserGroup,
    );
  }

  async createOneWithRelations(
    newUserGroup: NewEntity<UserGroup, 'id'>,
  ): Promise<CreatedEntity<UserGroup, 'id'>> {
    return await createOneWithRelations(this.repo, newUserGroup);
  }

  async createManyWithRelations(
    newUserGroups: NewEntity<UserGroup, 'id'>[],
  ): Promise<CreatedEntity<UserGroup, 'id'>[]> {
    return await createManyWithRelations(this.repo, newUserGroups);
  }

  async deleteMany(userGroupIds: number[]): Promise<void> {
    await this.repo.delete(userGroupIds);
  }
}
