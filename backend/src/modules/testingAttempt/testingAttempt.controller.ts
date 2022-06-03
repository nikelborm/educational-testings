import { TestingAttemptUseCase } from './testingAttempt.useCase';
import { ApiController } from 'src/tools';

@ApiController('testingAttempt')
export class TestingAttemptController {
  constructor(private readonly testingAttemptUseCase: TestingAttemptUseCase) {}
}
