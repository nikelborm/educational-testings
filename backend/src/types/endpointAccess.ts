import { EducationalSpaceAccessScopeType } from '.';

export enum EndpointAccess {
  PUBLIC = 'public',
  FORBIDDEN = 'forbidden',
  AUTHORIZED = 'authorized',
  UNAUTHORIZED_ONLY = 'unauthorizedOnly',
  DEVELOPMENT_ONLY = 'developmentOnly',
}

export type IAccessEnum = EducationalSpaceAccessScopeType | EndpointAccess;
export type UserLevelScopes = EducationalSpaceAccessScopeType | EducationalSpaceAccessScopeType[];
export type AllowedForArgs = (EndpointAccess | UserLevelScopes)[];
