import { AbstractTestingForPassingDTO } from './abstractTestingForPassing.response.dto';

export class GetLaunchedTestingResponseDTO {
  launchedTesting!: LaunchedTestingDTO;
}

export class LaunchedTestingDTO {
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
