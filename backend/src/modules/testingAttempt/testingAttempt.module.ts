import { Module } from '@nestjs/common';
import { TestingAttemptController } from './testingAttempt.controller';
import { TestingAttemptUseCase } from './testingAttempt.useCase';

@Module({
  providers: [TestingAttemptUseCase],
  controllers: [TestingAttemptController],
  exports: [TestingAttemptUseCase],
})
export class TestingAttemptModule {}
