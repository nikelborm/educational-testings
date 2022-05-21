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
import { LaunchedTesting } from '../model';

@Injectable()
export class LaunchedTestingRepo {
  constructor(
    @InjectRepository(LaunchedTesting)
    private readonly repo: Repository<LaunchedTesting>,
  ) {}

  async getOneById(id: number): Promise<LaunchedTesting> {
    const launchedTesting = await this.repo.findOne({
      where: { id },
    });
    if (!launchedTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'launchedTesting'),
      );
    return launchedTesting;
  }

  async updateOneWithRelations(
    updatedLaunchedTesting: UpdatedEntity<LaunchedTesting>,
  ): Promise<LaunchedTesting> {
    return await updateOneWithRelations(
      this.repo,
      updatedLaunchedTesting,
      'launchedTesting',
    );
  }

  async createOneWithRelations(
    newLaunchedTesting: NewEntity<LaunchedTesting>,
  ): Promise<LaunchedTesting> {
    return await createOneWithRelations(
      this.repo,
      newLaunchedTesting,
      'launchedTesting',
    );
  }

  async deleteMany(launchedTestingIds: number[]): Promise<void> {
    await this.repo.delete(launchedTestingIds);
  }
}
