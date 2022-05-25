// response
export class EducationalSpaceResponseDTO {
  id!: number;
  name!: string;
  description?: string;
  userGroups!: UserGroupInsideEducationalSpaceResponseDTO[];
}

export class UserGroupInsideEducationalSpaceResponseDTO {
  id!: number;
  name!: string;
  description?: string;
  inviteLinkPayload!: string;
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
}
export class UserGroupInsideEducationalSpaceFromDBDTO {
  id!: number;
  name!: string;
  description?: string;
}
