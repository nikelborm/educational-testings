import { Module } from '@nestjs/common';
import { EducationalSpaceController } from './educationalSpace.controller';
import { EducationalSpaceUseCase } from './educationalSpace.useCase';

@Module({
  providers: [EducationalSpaceUseCase],
  controllers: [EducationalSpaceController],
  exports: [EducationalSpaceUseCase],
})
export class EducationalSpaceModule {}
