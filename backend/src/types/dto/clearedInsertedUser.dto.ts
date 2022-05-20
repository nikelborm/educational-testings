import type { model } from 'src/modules';

export class ClearedInsertedUserDTO implements Omit<InputUser, 'password'> {
  id!: number;
  firstName!: string;
  lastName!: string;
  patronymic!: string;
  email!: string;
  userGroups!: model.UserGroup[];
}

export interface InputUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  password: string;
  userGroups: model.UserGroup[];
}
