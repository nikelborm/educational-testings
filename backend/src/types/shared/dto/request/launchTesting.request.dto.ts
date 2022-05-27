import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { LaunchedTestingAccessScopeType } from '../../model';

export class LaunchTestingDTO {
  @IsPositive()
  abstractTestingId!: number;

  @IsPositive()
  educationalSpaceId!: number;

  @IsOptional()
  @IsDateString()
  openingDate?: Date;

  @IsOptional()
  @IsDateString()
  closingDate?: Date;

  @IsOptional()
  @IsPositive()
  maximumAttemptDurationInMinutes?: number;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LaunchTestingAccessScopeDTO)
  accessScopes!: LaunchTestingAccessScopeDTO[];
}

export class LaunchTestingAccessScopeDTO {
  @IsPositive()
  userGroupId!: number;

  @IsEnum(LaunchedTestingAccessScopeType)
  type!: LaunchedTestingAccessScopeType;
}
