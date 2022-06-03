import { LaunchedTestingUseCase } from './launchedTesting.useCase';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import { Get, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import {
  AuthedRequest,
  EmptyResponseDTO,
  GetLaunchedTestingForPassingResponseDTO,
  LaunchTestingDTO,
} from 'src/types';

@ApiController('launchedTesting')
export class LaunchedTestingController {
  constructor(
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}

  @Get('getLaunchedTestingForPassingById')
  @AuthorizedOnly()
  async getLaunchedTestingForPassingById(
    @Query('id', ParseIntPipe) id: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetLaunchedTestingForPassingResponseDTO> {
    const launchedTesting =
      await this.launchedTestingUseCase.getLaunchedTestingByIdForPassing(
        id,
        user,
      );
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
