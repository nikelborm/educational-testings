import { LaunchedTestingUseCase } from './launchedTesting.useCase';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import { Post, Req } from '@nestjs/common';
import { AuthedRequest, EmptyResponseDTO, LaunchTestingDTO } from 'src/types';

@ApiController('launchedTesting')
export class LaunchedTestingController {
  constructor(
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}

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
