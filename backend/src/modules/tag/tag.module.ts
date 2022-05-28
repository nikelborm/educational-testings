import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagUseCase } from './tag.useCase';

@Module({
  providers: [TagUseCase],
  controllers: [TagController],
  exports: [TagUseCase],
})
export class TagModule {}
