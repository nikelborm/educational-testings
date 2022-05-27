import { IsPositive } from 'class-validator';

export class AddTestingToEducationalSpaceCatalogDTO {
  @IsPositive()
  educationalSpaceId!: number;

  @IsPositive()
  abstractTestingId!: number;
}
