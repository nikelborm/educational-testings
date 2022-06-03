import { Module } from '@nestjs/common';
import { AbstractTestingModule } from '../abstractTesting';
import { LaunchedTestingController } from './launchedTesting.controller';
import { LaunchedTestingUseCase } from './launchedTesting.useCase';

@Module({
  imports: [AbstractTestingModule],
  providers: [LaunchedTestingUseCase],
  controllers: [LaunchedTestingController],
  exports: [LaunchedTestingUseCase],
})
export class LaunchedTestingModule {}
