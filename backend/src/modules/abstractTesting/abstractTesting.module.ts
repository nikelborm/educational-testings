import { Module } from '@nestjs/common';
import { LaunchedTestingModule } from '../launchedTesting';
import { AbstractTestingController } from './abstractTesting.controller';
import { AbstractTestingUseCase } from './abstractTesting.useCase';

@Module({
  imports: [LaunchedTestingModule],
  providers: [AbstractTestingUseCase],
  controllers: [AbstractTestingController],
  exports: [AbstractTestingUseCase],
})
export class AbstractTestingModule {}
