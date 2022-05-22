import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEducationalSpaceDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  description?: string | undefined;
}
