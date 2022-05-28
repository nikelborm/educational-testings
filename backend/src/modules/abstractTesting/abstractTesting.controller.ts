import { Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { AbstractTestingUseCase } from './abstractTesting.useCase';
import {
  AuthedRequest,
  EmptyResponseDTO,
  GetAvailableForLaunchTestingsDTO,
  GetPublicAbstractTestings,
  LaunchTestingDTO,
} from 'src/types';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import { LaunchedTestingUseCase } from '../launchedTesting';

@ApiController('abstractTesting')
export class AbstractTestingController {
  constructor(
    private readonly abstractTestingUseCase: AbstractTestingUseCase,
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}

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

  @Post('launch')
  @AuthorizedOnly()
  async launchAbstractTesting(
    @ValidatedBody launchTestingDTO: LaunchTestingDTO,
    @Req() { user }: AuthedRequest,
  ): Promise<EmptyResponseDTO> {
    await this.launchedTestingUseCase.launchTesting(launchTestingDTO, user);
    return {};
  }
}
