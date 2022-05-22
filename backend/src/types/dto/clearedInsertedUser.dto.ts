import type { model } from 'src/modules';

export class ClearedInsertedUserDTO implements Omit<InputUser, 'password'> {
  id!: number;
  firstName!: string;
  lastName!: string;
  patronymic!: string;
  canCreateEducationalSpaces!: boolean;
  gender!: string;
  email!: string;
  userGroups!: model.UserGroup[];
}

export interface InputUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: string;
  canCreateEducationalSpaces: boolean;
  email: string;
  password: string;
  userGroups: model.UserGroup[];
}
