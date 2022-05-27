import { Module } from '@nestjs/common';
import { LaunchedTestingController } from './launchedTesting.controller';
import { LaunchedTestingUseCase } from './launchedTesting.useCase';

@Module({
  providers: [LaunchedTestingUseCase],
  controllers: [LaunchedTestingController],
  exports: [LaunchedTestingUseCase],
})
export class LaunchedTestingModule {}
