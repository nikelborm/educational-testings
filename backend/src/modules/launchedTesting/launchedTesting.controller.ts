import { LaunchedTestingUseCase } from './launchedTesting.useCase';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import { Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import {
  AuthedRequest,
  EmptyResponseDTO,
  GetLaunchedTestingResponseDTO,
  LaunchTestingDTO,
} from 'src/types';

@ApiController('launchedTesting')
export class LaunchedTestingController {
  constructor(
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}

  @Get('getLaunchedTestingById')
  @AuthorizedOnly()
  async getLaunchedTestingById(
    @Query('id', ParseIntPipe) id: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetLaunchedTestingResponseDTO> {
    const launchedTesting =
      await this.launchedTestingUseCase.getLaunchedTestingById(id, user);
    return { launchedTesting };
  }

  @Post('create')
  @AuthorizedOnly()
  async launchAbstractTesting(
    @ValidatedBody launchTestingDTO: LaunchTestingDTO,
    @Req() { user }: AuthedRequest,
  ): Promise<EmptyResponseDTO> {
    await this.launchedTestingUseCase.launchTesting(launchTestingDTO, user);
    return {};
  }

  // getLaunchedTestingByIdForPassing
}
