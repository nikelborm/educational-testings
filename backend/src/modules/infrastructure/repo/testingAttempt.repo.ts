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
import { TestingAttempt } from '../model';

@Injectable()
export class TestingAttemptRepo {
  constructor(
    @InjectRepository(TestingAttempt)
    private readonly repo: Repository<TestingAttempt>,
  ) {}

  async getOneById(id: number): Promise<TestingAttempt> {
    const testingAttempt = await this.repo.findOne({
      where: { id },
    });
    if (!testingAttempt)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'testingAttempt'),
      );
    return testingAttempt;
  }

  async findManyBy(
    userId: number,
    educationalSpaceId: number,
  ): Promise<
    {
      id: number;
      launchedTesting: {
        id: number;
        educationalSpaceId: number;
      };
    }[]
  > {
    return await this.repo.find({
      select: {
        id: true,
        launchedTesting: {
          id: true,
          educationalSpaceId: true,
        },
      },
      relations: {
        launchedTesting: true,
      },
      where: {
        userId,
        launchedTesting: {
          educationalSpaceId,
        },
      },
    });
  }

  async updateOneWithRelations(
    updatedTestingAttempt: UpdateEntity<TestingAttempt, 'id'>,
  ): Promise<TestingAttempt> {
    return await updateOneWithRelations<TestingAttempt, 'id'>(
      this.repo,
      updatedTestingAttempt,
    );
  }

  async createOneWithRelations(
    newTestingAttempt: NewEntity<TestingAttempt, 'id'>,
  ): Promise<CreatedEntity<TestingAttempt, 'id'>> {
    return await createOneWithRelations(this.repo, newTestingAttempt);
  }

  async createManyWithRelations(
    newTestingAttempts: NewEntity<TestingAttempt, 'id'>[],
  ): Promise<CreatedEntity<TestingAttempt, 'id'>[]> {
    return await createManyWithRelations(this.repo, newTestingAttempts);
  }

  async deleteMany(testingAttemptIds: number[]): Promise<void> {
    await this.repo.delete(testingAttemptIds);
  }
}
