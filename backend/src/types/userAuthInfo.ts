import type {
  EducationalSpaceAccessScopeType,
  LaunchedTestingAccessScopeType,
  UserGroupManagementAccessScopeType,
} from 'src/types';

export interface UserAuthInfo {
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
}
