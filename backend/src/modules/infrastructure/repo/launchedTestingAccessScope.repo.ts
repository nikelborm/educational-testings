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
    updatedLaunchedTestingAccessScope: UpdatedEntity<LaunchedTestingAccessScope>,
  ): Promise<LaunchedTestingAccessScope> {
    return await updateOneWithRelations(
      this.repo,
      updatedLaunchedTestingAccessScope,
      'launchedTestingAccessScope',
    );
  }

  async createOneWithRelations(
    newLaunchedTestingAccessScope: NewEntity<LaunchedTestingAccessScope>,
  ): Promise<LaunchedTestingAccessScope> {
    return await createOneWithRelations(
      this.repo,
      newLaunchedTestingAccessScope,
      'launchedTestingAccessScope',
    );
  }

  async deleteMany(launchedTestingAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(launchedTestingAccessScopeIds);
  }
}
