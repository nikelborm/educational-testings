import { Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { EducationalSpaceUseCase } from './educationalSpace.useCase';
import {
  AuthedRequest,
  CreateEducationalSpaceDTO,
  EmptyResponseDTO,
  GetEducationalSpaceDTO,
  GetMyEducationalSpacesResponseDTO,
  UseInviteLinkDTO,
} from 'src/types';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';

@ApiController('educationalSpace')
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

  @Post('useInvite')
  @AuthorizedOnly()
  async useInviteLink(
    @ValidatedBody
    {
      givenByUserId,
      inviteToUserGroupId,
      signature,
      expirationDate,
    }: UseInviteLinkDTO,
    @Req() { user }: AuthedRequest,
  ): Promise<EmptyResponseDTO> {
    await this.educationalSpaceUseCase.useInviteLink(
      givenByUserId,
      inviteToUserGroupId,
      signature,
      expirationDate,
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
