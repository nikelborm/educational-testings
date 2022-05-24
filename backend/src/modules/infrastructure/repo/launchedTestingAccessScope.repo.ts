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
import { LaunchedTestingAccessScope } from '../model';

@Injectable()
export class LaunchedTestingAccessScopeRepo {
  constructor(
    @InjectRepository(LaunchedTestingAccessScope)
    private readonly repo: Repository<LaunchedTestingAccessScope>,
  ) {}

  async getOneById(id: number): Promise<LaunchedTestingAccessScope> {
    const launchedTestingAccessScope = await this.repo.findOne({
      where: { id },
    });
    if (!launchedTestingAccessScope)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(
          id,
          'launchedTestingAccessScope',
        ),
      );
    return launchedTestingAccessScope;
  }

  async updateOneWithRelations(
    updatedLaunchedTestingAccessScope: UpdateEntity<
      LaunchedTestingAccessScope,
      'id'
    >,
  ): Promise<LaunchedTestingAccessScope> {
    return await updateOneWithRelations<LaunchedTestingAccessScope, 'id'>(
      this.repo,
      updatedLaunchedTestingAccessScope,
    );
  }

  async createOneWithRelations(
    newLaunchedTestingAccessScope: NewEntity<LaunchedTestingAccessScope, 'id'>,
  ): Promise<CreatedEntity<LaunchedTestingAccessScope, 'id'>> {
    return await createOneWithRelations(
      this.repo,
      newLaunchedTestingAccessScope,
    );
  }

  async createManyWithRelations(
    newLaunchedTestingAccessScopes: NewEntity<
      LaunchedTestingAccessScope,
      'id'
    >[],
  ): Promise<CreatedEntity<LaunchedTestingAccessScope, 'id'>[]> {
    return await createManyWithRelations(
      this.repo,
      newLaunchedTestingAccessScopes,
    );
  }

  async deleteMany(launchedTestingAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(launchedTestingAccessScopeIds);
  }
}
