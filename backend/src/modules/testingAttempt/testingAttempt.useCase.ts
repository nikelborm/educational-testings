import { Injectable } from '@nestjs/common';
import { TestingAttemptStatus, UserAuthInfo } from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class TestingAttemptUseCase {
  constructor(private readonly testingAttemptRepo: repo.TestingAttemptRepo) {}

  async createTestingAttempt(
    launchedTestingId: number,
    user: UserAuthInfo,
  ): Promise<void> {
    await this.testingAttemptRepo.createOneWithRelations({
      user,
      launchedTestingId,
      status: TestingAttemptStatus.DRAFT,
    });
  }
}
