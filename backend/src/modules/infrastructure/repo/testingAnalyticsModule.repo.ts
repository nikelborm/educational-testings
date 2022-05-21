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
import { TestingAnalyticsModule } from '../model';

@Injectable()
export class TestingAnalyticsModuleRepo {
  constructor(
    @InjectRepository(TestingAnalyticsModule)
    private readonly repo: Repository<TestingAnalyticsModule>,
  ) {}

  async getOneById(id: number): Promise<TestingAnalyticsModule> {
    const testingAnalyticsModule = await this.repo.findOne({
      where: { id },
    });
    if (!testingAnalyticsModule)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'testingAnalyticsModule'),
      );
    return testingAnalyticsModule;
  }

  async updateOneWithRelations(
    updatedTestingAnalyticsModule: UpdatedEntity<TestingAnalyticsModule>,
  ): Promise<TestingAnalyticsModule> {
    return await updateOneWithRelations(
      this.repo,
      updatedTestingAnalyticsModule,
      'testingAnalyticsModule',
    );
  }

  async createOneWithRelations(
    newTestingAnalyticsModule: NewEntity<TestingAnalyticsModule>,
  ): Promise<TestingAnalyticsModule> {
    return await createOneWithRelations(
      this.repo,
      newTestingAnalyticsModule,
      'testingAnalyticsModule',
    );
  }

  async deleteMany(testingAnalyticsModuleIds: number[]): Promise<void> {
    await this.repo.delete(testingAnalyticsModuleIds);
  }
}
