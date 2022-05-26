import { IsDateString, IsPositive } from 'class-validator';

export class UseInviteLinkDTO {
  @IsPositive()
  givenByUserId!: number;

  @IsPositive()
  inviteToUserGroupId!: number;

  @IsDateString()
  expirationDate!: string;

  @IsPositive()
  signature!: string;
}
