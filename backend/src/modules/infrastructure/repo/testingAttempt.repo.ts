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

  async updateOneWithRelations(
    updatedTestingAttempt: UpdatedEntity<TestingAttempt>,
  ): Promise<TestingAttempt> {
    return await updateOneWithRelations(
      this.repo,
      updatedTestingAttempt,
      'testingAttempt',
    );
  }

  async createOneWithRelations(
    newTestingAttempt: NewEntity<TestingAttempt>,
  ): Promise<TestingAttempt> {
    return await createOneWithRelations(
      this.repo,
      newTestingAttempt,
      'testingAttempt',
    );
  }

  async deleteMany(testingAttemptIds: number[]): Promise<void> {
    await this.repo.delete(testingAttemptIds);
  }
}
