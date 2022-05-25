import {
  EducationalSpaceAccessScopeType,
  UserGroupManagementAccessScopeType,
  LaunchedTestingAccessScopeType,
} from '../shared';

export enum EndpointAccess {
  PUBLIC = 'public',
  FORBIDDEN = 'forbidden',
  AUTHORIZED = 'authorized',
  UNAUTHORIZED_ONLY = 'unauthorizedOnly',
  DEVELOPMENT_ONLY = 'developmentOnly',
}

export type UserLevelScopes =
  | EducationalSpaceAccessScopeType
  // | EducationalSpaceAccessScopeType[]
  | UserGroupManagementAccessScopeType
  // | UserGroupManagementAccessScopeType[]
  | LaunchedTestingAccessScopeType;
// | LaunchedTestingAccessScopeType[];

export type AllowedForArgs = (EndpointAccess | UserLevelScopes)[];
