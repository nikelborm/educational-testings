import { ClearedInsertedUserDTO } from '../clearedInsertedUser.dto';

export class CreateManyUsersResponseDTO {
  response!: {
    users: ClearedInsertedUserDTO[];
  };
}
