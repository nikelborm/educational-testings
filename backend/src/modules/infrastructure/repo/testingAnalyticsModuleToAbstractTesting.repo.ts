import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestingAnalyticsModuleToAbstractTesting } from '../model';

@Injectable()
export class TestingAnalyticsModuleToAbstractTestingRepo {
  constructor(
    @InjectRepository(TestingAnalyticsModuleToAbstractTesting)
    private readonly repo: Repository<TestingAnalyticsModuleToAbstractTesting>,
  ) {}
}
