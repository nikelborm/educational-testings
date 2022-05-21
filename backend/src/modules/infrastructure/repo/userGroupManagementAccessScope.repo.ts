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
import { UserGroupManagementAccessScope } from '../model';

@Injectable()
export class UserGroupManagementAccessScopeRepo {
  constructor(
    @InjectRepository(UserGroupManagementAccessScope)
    private readonly repo: Repository<UserGroupManagementAccessScope>,
  ) {}

  async getOneById(id: number): Promise<UserGroupManagementAccessScope> {
    const userGroupManagementAccessScope = await this.repo.findOne({
      where: { id },
    });
    if (!userGroupManagementAccessScope)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(
          id,
          'userGroupManagementAccessScope',
        ),
      );
    return userGroupManagementAccessScope;
  }

  async updateOneWithRelations(
    updatedUserGroupManagementAccessScope: UpdatedEntity<UserGroupManagementAccessScope>,
  ): Promise<UserGroupManagementAccessScope> {
    return await updateOneWithRelations(
      this.repo,
      updatedUserGroupManagementAccessScope,
      'userGroupManagementAccessScope',
    );
  }

  async createOneWithRelations(
    newUserGroupManagementAccessScope: NewEntity<UserGroupManagementAccessScope>,
  ): Promise<UserGroupManagementAccessScope> {
    return await createOneWithRelations(
      this.repo,
      newUserGroupManagementAccessScope,
      'userGroupManagementAccessScope',
    );
  }

  async deleteMany(userGroupManagementAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(userGroupManagementAccessScopeIds);
  }
}
