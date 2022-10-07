import { TestingAttemptStatus } from '../../model';
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
  abstractTesting?: {
    id: number;
    name: string;
    description?: string;
    goal: string;
    isReadyToUse: boolean;
    isPublic: boolean;
  };
  testingAttempts?: {
    id: number;
    status: TestingAttemptStatus;
    givenAnswers: {
      id: number;
      freeFieldAnswer?: string;
      answerOptionInstance: {}
    }[];
  }[];
  abstractTestingForPassingAndAnalytics?: AbstractTestingForPassingDTO;
}
