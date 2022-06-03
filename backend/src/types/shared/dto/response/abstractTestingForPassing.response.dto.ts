import {
  AbstractAnswerDataType,
  AbstractQuestionChoiceType,
  TestingAnalyticsModuleSupport,
} from '../../model';

export class AbstractTestingForPassingResponseDTO {
  abstractTesting!: AbstractTestingForPassingDTO;
}

export class AbstractTestingForPassingDTO {
  id!: number;
  name!: string;
  description?: string;
  goal!: string;
  isReadyToUse!: boolean;
  isPublic!: boolean;
  stages!: {
    id: number;
    name: string;
    description?: string;
    questions: {
      id: number;
      name: string;
      description?: string;
      isRequired: boolean;
      order: number;
      answerChoiceType: AbstractQuestionChoiceType;
      dataTypeOfAnswers: AbstractAnswerDataType;
      abstractAnswerOptions: {
        id: number;
        isFreeField: boolean;
        answer: string;
        description?: string;
        contributions: {
          id: number;
          tag: {
            id: number;
            name: string;
            description: string;
          };
          weight: number;
        }[];
      }[];
    }[];
    order: number;
  }[];
  analyticsModules!: {
    id: number;
    uuid: string;
    name: string;
    description?: string;
    support: TestingAnalyticsModuleSupport;
  }[];
}
