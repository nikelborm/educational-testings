import { Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { AbstractTestingUseCase } from './abstractTesting.useCase';
import {
  AuthedRequest,
  EmptyResponseDTO,
  GetAvailableForLaunchTestingsDTO,
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

  @Get('availableToLaunchIn')
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
