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
import { LaunchedTesting } from '../model';

@Injectable()
export class LaunchedTestingRepo {
  constructor(
    @InjectRepository(LaunchedTesting)
    private readonly repo: Repository<LaunchedTesting>,
  ) {}

  async getOneByIdWithNestedInstances(id: number): Promise<LaunchedTesting> {
    const launchedTesting = await this.repo.findOne({
      where: { id },
      relations: {
        questionInstances: true,
        answerOptionInstances: true,
      },
    });
    if (!launchedTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'launchedTesting'),
      );
    return launchedTesting;
  }

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
    updatedLaunchedTesting: UpdateEntity<LaunchedTesting, 'id'>,
  ): Promise<LaunchedTesting> {
    return await updateOneWithRelations<LaunchedTesting, 'id'>(
      this.repo,
      updatedLaunchedTesting,
    );
  }

  async createOneWithRelations(
    newLaunchedTesting: NewEntity<LaunchedTesting, 'id'>,
  ): Promise<CreatedEntity<LaunchedTesting, 'id'>> {
    return await createOneWithRelations(this.repo, newLaunchedTesting);
  }

  async createManyWithRelations(
    newLaunchedTestings: NewEntity<LaunchedTesting, 'id'>[],
  ): Promise<CreatedEntity<LaunchedTesting, 'id'>[]> {
    return await createManyWithRelations(this.repo, newLaunchedTestings);
  }

  async deleteMany(launchedTestingIds: number[]): Promise<void> {
    await this.repo.delete(launchedTestingIds);
  }
}
