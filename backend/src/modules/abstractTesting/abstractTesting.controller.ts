import { Get, ParseIntPipe, Query, Req } from '@nestjs/common';
import { AbstractTestingUseCase } from './abstractTesting.useCase';
import {
  GetAbstractTestingForPassingResponseDTO,
  AuthedRequest,
  GetAvailableForLaunchTestingsDTO,
  GetPublicAbstractTestings,
} from 'src/types';
import { ApiController, AuthorizedOnly } from 'src/tools';

@ApiController('abstractTesting')
export class AbstractTestingController {
  constructor(
    private readonly abstractTestingUseCase: AbstractTestingUseCase,
  ) {}

  @Get('getAbstractTestingForPassingById')
  @AuthorizedOnly()
  async getAbstractTestingForPassingById(
    @Query('id', ParseIntPipe) id: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetAbstractTestingForPassingResponseDTO> {
    const abstractTesting =
      await this.abstractTestingUseCase.getAbstractTestingForPublicDemoPassingById(
        id,
        user,
      );
    return { abstractTesting };
  }

  @Get('getAvailableToLaunchIn')
  @AuthorizedOnly()
  async getAvailableToLaunchInEducationalSpace(
    @Query('educationalSpaceId', ParseIntPipe)
    educationalSpaceId: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetAvailableForLaunchTestingsDTO> {
    return await this.abstractTestingUseCase.getAvailableToLaunchIn(
      educationalSpaceId,
      user,
    );
  }

  @Get('getPublic')
  async getPublicAbstractTestings(): Promise<GetPublicAbstractTestings> {
    const abstractTestings =
      await this.abstractTestingUseCase.getPublicAbstractTestings();
    return { abstractTestings };
  }
}
