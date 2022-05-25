export class EducationalSpaceDTO {
  id!: number;
  name!: string;
  description?: string;
  createdByUserId!: number;
  userGroups!: UserGroupInsideEducationalSpaceDTO[];
  createdAt!: Date;
  updatedAt!: Date;
}

export class UserGroupInsideEducationalSpaceDTO {
  id!: number;
  name!: string;
  description?: string;
  educationalSpaceId!: number;
  createdByUserId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetEducationalSpaceDTO {
  educationalSpace!: EducationalSpaceDTO;
}
