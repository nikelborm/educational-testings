import { Module } from '@nestjs/common';
import { AbstractTestingController } from './abstractTesting.controller';
import { AbstractTestingUseCase } from './abstractTesting.useCase';

@Module({
  providers: [AbstractTestingUseCase],
  controllers: [AbstractTestingController],
  exports: [AbstractTestingUseCase],
})
export class AbstractTestingModule {}
