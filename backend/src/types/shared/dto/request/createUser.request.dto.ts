import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  patronymic!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  gender!: string;

  @IsBoolean()
  canCreateEducationalSpaces!: boolean;

  @IsEmail()
  @MinLength(2)
  @MaxLength(50)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}

export class CreateUsersDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  users!: CreateUserDTO[];
}
