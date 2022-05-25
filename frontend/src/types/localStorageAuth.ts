export type ISession =
  | { isAuthed: false }
  | {
      isAuthed: true;
      accessToken: {
        text: string;
        payload: IAccessTokenPayload;
      };
      refreshToken: {
        text: string;
        payload: IRefreshTokenPayload;
      };
    };

export type IAccessTokenPayload = {
  sessionUUID: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    gender: string;
    canCreateEducationalSpaces: boolean;
    phone?: string | undefined;
    userGroups: {
      id: number;
      educationalSpaceId: number;
      educationalSpaceAccessScopes: {
        id: number;
        type: EducationalSpaceAccessScopeType;
      }[];
      launchedTestingAccessScopes: {
        id: number;
        type: LaunchedTestingAccessScopeType;
        launchedTestingId: number;
      }[];
      leaderInAccessScopes: {
        id: number;
        type: UserGroupManagementAccessScopeType;
        subordinateUserGroupId: number;
      }[];
    }[];
  };
};

export type IRefreshTokenPayload = {
  sessionUUID: string;
  user: {
    id: number;
  };
};

export type ITokenPair = { accessToken: string; refreshToken: string };

export enum EducationalSpaceAccessScopeType {
  ADD_OWN_ABSTRACT_TESTINGS_INTO_EDUCATIONAL_SPACE_CATALOG = 'addOwnAbstractTestingsIntoEducationalSpaceCatalog',

  VIEW_LAUNCHED_TESTINGS = 'viewLaunchedTestings',
  MODIFY_LAUNCHED_TESTINGS = 'modifyLaunchedTestings',

  MODIFY_USER_GROUPS = 'modifyUserGroups',
  VIEW_USER_GROUPS = 'viewUserGroups',

  MODIFY_SPACE_INFO = 'modifySpaceInfo',
  DELETE_OWN_SPACE = 'deleteOwnSpace',
}

export enum LaunchedTestingAccessScopeType {
  VIEW_ANALYTICS = 'viewAnalytics',
  VIEW_USERS_FINISHED_TESTING = 'viewUsersFinishedTesting',
  MAKE_TESTING_ATTEMPTS = 'makeTestingAttempts',
}

export enum UserGroupManagementAccessScopeType {
  INVITE_USERS = 'inviteUsers',
  REMOVE_USERS = 'removeUsers',
  VIEW_USERS = 'viewUsers',
}
