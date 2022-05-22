import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationalSpaceUseCase } from './educationalSpace.useCase';
import {
  AuthedRequest,
  CreateEducationalSpaceDTO,
  EmptyResponseDTO,
} from 'src/types';
import { AuthorizedOnly, ValidatedBody } from 'src/tools';

@ApiTags('educationalSpace')
@Controller('educationalSpace')
export class EducationalSpaceController {
  constructor(
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
  ) {}

  @Post('create')
  @AuthorizedOnly()
  async createEducationalSpace(
    @ValidatedBody educationalSpaceDto: CreateEducationalSpaceDTO,
    @Req() { user }: AuthedRequest,
  ): Promise<EmptyResponseDTO> {
    await this.educationalSpaceUseCase.createEducationalSpace(
      educationalSpaceDto,
      user,
    );
    return { response: {} };
  }
}
