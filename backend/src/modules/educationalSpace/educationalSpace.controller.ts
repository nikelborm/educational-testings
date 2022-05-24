import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationalSpaceUseCase } from './educationalSpace.useCase';
import {
  AuthedRequest,
  CreateEducationalSpaceDTO,
  EmptyResponseDTO,
  GetEducationalSpaceDTO,
  GetMyEducationalSpacesResponseDTO,
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
    return {};
  }

  @Get('getMine')
  @AuthorizedOnly()
  async getMyEducationalSpaces(
    @Req() { user }: AuthedRequest,
  ): Promise<GetMyEducationalSpacesResponseDTO> {
    const myEducationalSpaces =
      await this.educationalSpaceUseCase.getAllowedEducationalSpacesOf(user.id);
    return {
      myEducationalSpaces,
    };
  }

  @Get('getOneBy')
  @AuthorizedOnly()
  async getOneById(
    @Query('id', ParseIntPipe) id: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetEducationalSpaceDTO> {
    const educationalSpace = await this.educationalSpaceUseCase.getOneBy(
      id,
      user,
    );
    return {
      educationalSpace,
    };
  }
}
