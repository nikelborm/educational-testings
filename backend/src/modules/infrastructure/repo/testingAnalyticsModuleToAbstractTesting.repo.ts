import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatedEntity, createManyWithRelations, NewEntity } from 'src/tools';
import { Repository } from 'typeorm';
import { TestingAnalyticsModuleToAbstractTesting } from '../model';

@Injectable()
export class TestingAnalyticsModuleToAbstractTestingRepo {
  constructor(
    @InjectRepository(TestingAnalyticsModuleToAbstractTesting)
    private readonly repo: Repository<TestingAnalyticsModuleToAbstractTesting>,
  ) {}

  async createManyWithRelations(
    newTestingAnalyticsModuleToAbstractTestings: NewEntity<
      TestingAnalyticsModuleToAbstractTesting,
      never
    >[],
  ): Promise<CreatedEntity<TestingAnalyticsModuleToAbstractTesting, never>[]> {
    return await createManyWithRelations(
      this.repo,
      newTestingAnalyticsModuleToAbstractTestings,
    );
  }
}
