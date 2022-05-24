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
    updatedUserGroupManagementAccessScope: UpdateEntity<
      UserGroupManagementAccessScope,
      'id'
    >,
  ): Promise<UserGroupManagementAccessScope> {
    return await updateOneWithRelations<UserGroupManagementAccessScope, 'id'>(
      this.repo,
      updatedUserGroupManagementAccessScope,
    );
  }

  async createOneWithRelations(
    newUserGroupManagementAccessScope: NewEntity<
      UserGroupManagementAccessScope,
      'id'
    >,
  ): Promise<CreatedEntity<UserGroupManagementAccessScope, 'id'>> {
    return await createOneWithRelations(
      this.repo,
      newUserGroupManagementAccessScope,
    );
  }

  async createManyWithRelations(
    newUserGroupManagementAccessScopes: NewEntity<
      UserGroupManagementAccessScope,
      'id'
    >[],
  ): Promise<CreatedEntity<UserGroupManagementAccessScope, 'id'>[]> {
    return await createManyWithRelations(
      this.repo,
      newUserGroupManagementAccessScopes,
    );
  }

  async deleteMany(userGroupManagementAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(userGroupManagementAccessScopeIds);
  }
}
