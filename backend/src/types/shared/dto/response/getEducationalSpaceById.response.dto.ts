import { UseInviteLinkDTO } from '../request/useInviteLink.dto';

// response
export class EducationalSpaceResponseDTO {
  id!: number;
  name!: string;
  description?: string;
  userGroups!: UserGroupInsideEducationalSpaceResponseDTO[];
  launchedTestings!: LaunchedTestingInsideEducationalSpaceFromDBDTO[];
}

export class UserGroupInsideEducationalSpaceResponseDTO {
  id!: number;
  name!: string;
  description?: string;
  inviteLinkPayload?: UseInviteLinkDTO;
}

export class GetEducationalSpaceDTO {
  educationalSpace!: EducationalSpaceResponseDTO;
}

// db origin
export class EducationalSpaceFromDBDTO {
  id!: number;
  name!: string;
  description?: string;
  userGroups!: UserGroupInsideEducationalSpaceFromDBDTO[];
  launchedTestings!: LaunchedTestingInsideEducationalSpaceFromDBDTO[];
}

export class LaunchedTestingInsideEducationalSpaceFromDBDTO {
  id!: number;
  openingDate?: Date;
  closingDate?: Date;
  maximumAttemptDurationInMinutes?: number;
  abstractTesting!: AbstractTestingInsideLaunchedTestingFromDBDTO;
}

export class AbstractTestingInsideLaunchedTestingFromDBDTO {
  id!: number;
  name!: string;
  description?: string;
  goal!: string;
}

export class UserGroupInsideEducationalSpaceFromDBDTO {
  id!: number;
  name!: string;
  description?: string;
}
