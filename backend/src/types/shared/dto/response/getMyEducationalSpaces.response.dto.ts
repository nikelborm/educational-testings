export class UserGroupsOfMyEducationalSpaceDTO {
  id!: number;
  name!: string;
}

export class MyEducationalSpacesDTO {
  id!: number;
  name!: string;
  description?: string;
  userGroups!: UserGroupsOfMyEducationalSpaceDTO[];
}

export class GetMyEducationalSpacesResponseDTO {
  myEducationalSpaces!: MyEducationalSpacesDTO[];
}
