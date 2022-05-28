import { TagUseCase } from './tag.useCase';
import { ApiController } from 'src/tools';
import { Get, ParseIntPipe, Query } from '@nestjs/common';
import { GetManyTagsResponseDTO, SingleTagResponseDTO } from 'src/types';

@ApiController('tag')
export class TagController {
  constructor(private readonly tagUseCase: TagUseCase) {}

  @Get('all')
  async getAll(): Promise<GetManyTagsResponseDTO> {
    const tags = await this.tagUseCase.getAll();
    return {
      tags,
    };
  }

  @Get('oneById')
  async getOneById(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<SingleTagResponseDTO> {
    const tag = await this.tagUseCase.getOneById(id);
    return { tag };
  }
}
