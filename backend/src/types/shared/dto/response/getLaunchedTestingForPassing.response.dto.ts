import { AbstractTestingForPassingDTO } from './abstractTestingForPassing.response.dto';

export class GetLaunchedTestingForPassingResponseDTO {
  launchedTesting!: LaunchedTestingForPassingDTO;
}

export class LaunchedTestingForPassingDTO {
  id!: number;
  openingDate?: Date;
  closingDate?: Date;
  maximumAttemptDurationInMinutes?: number;
  questionInstances!: {
    id: number;
    abstractQuestionId: number;
  }[];
  answerOptionInstances!: {
    id: number;
    abstractAnswerOptionId: number;
  }[];
  abstractTesting!: AbstractTestingForPassingDTO;
}
