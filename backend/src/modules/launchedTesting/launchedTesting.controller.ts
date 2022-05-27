import { Post, Req } from '@nestjs/common';
import { LaunchedTestingUseCase } from './launchedTesting.useCase';
import { AuthedRequest, EmptyResponseDTO, LaunchTestingDTO } from 'src/types';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';

@ApiController('launchedTesting')
export class LaunchedTestingController {
  constructor(
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}

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
