import { Get, ParseIntPipe, Query, Req } from '@nestjs/common';
import { AbstractTestingUseCase } from './abstractTesting.useCase';
import { AuthedRequest, GetAvailableForLaunchTestingsDTO } from 'src/types';
import { ApiController, AuthorizedOnly } from 'src/tools';

@ApiController('abstractTesting')
export class AbstractTestingController {
  constructor(
    private readonly abstractTestingUseCase: AbstractTestingUseCase,
  ) {}

  @Get('availableToLaunchIn')
  @AuthorizedOnly()
  async launchAbstractTesting(
    @Query('educationalSpaceId', ParseIntPipe)
    educationalSpaceId: number,
    @Req() { user }: AuthedRequest,
  ): Promise<GetAvailableForLaunchTestingsDTO> {
    const abstractTestings =
      await this.abstractTestingUseCase.getAvailableToLaunchIn(
        educationalSpaceId,
        user,
      );
    return {
      abstractTestings,
    };
  }
}
