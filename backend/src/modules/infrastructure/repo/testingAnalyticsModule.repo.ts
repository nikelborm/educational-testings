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
    updatedTestingAnalyticsModule: UpdateEntity<TestingAnalyticsModule, 'id'>,
  ): Promise<TestingAnalyticsModule> {
    return await updateOneWithRelations<TestingAnalyticsModule, 'id'>(
      this.repo,
      updatedTestingAnalyticsModule,
    );
  }

  async createOneWithRelations(
    newTestingAnalyticsModule: NewEntity<TestingAnalyticsModule, 'id'>,
  ): Promise<CreatedEntity<TestingAnalyticsModule, 'id'>> {
    return await createOneWithRelations(this.repo, newTestingAnalyticsModule);
  }

  async createManyWithRelations(
    newTestingAnalyticsModules: NewEntity<TestingAnalyticsModule, 'id'>[],
  ): Promise<CreatedEntity<TestingAnalyticsModule, 'id'>[]> {
    return await createManyWithRelations(this.repo, newTestingAnalyticsModules);
  }

  async deleteMany(testingAnalyticsModuleIds: number[]): Promise<void> {
    await this.repo.delete(testingAnalyticsModuleIds);
  }
}
