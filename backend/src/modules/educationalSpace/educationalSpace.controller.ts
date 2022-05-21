import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationalSpaceUseCase } from './educationalSpace.useCase';
import { EmptyResponseDTO } from 'src/types';
import { ValidatedBody } from 'src/tools';

@ApiTags('educationalSpace')
@Controller()
export class EducationalSpaceController {
  constructor(
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
  ) {}
}
