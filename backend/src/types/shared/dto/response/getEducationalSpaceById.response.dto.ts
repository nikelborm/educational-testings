export class EducationalSpaceDTO {
  id!: number;
  name!: string;
  description?: string;
  createdByUserId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetEducationalSpaceDTO {
  educationalSpace!: EducationalSpaceDTO;
}
