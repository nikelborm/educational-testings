import { LaunchedTestingUseCase } from './launchedTesting.useCase';
import { ApiController } from 'src/tools';

@ApiController('launchedTesting')
export class LaunchedTestingController {
  constructor(
    private readonly launchedTestingUseCase: LaunchedTestingUseCase,
  ) {}
}
