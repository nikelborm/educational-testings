import { UserAuthInfo, UserGroupManagementAccessScopeType } from 'backendTypes';

export function doesUserHaveGroupAccess(
  user: UserAuthInfo,
  accessOverUserGroupId: number,
  userGroupManagementAccessScopeType: UserGroupManagementAccessScopeType,
): boolean {
  return user.userGroups
    .flatMap(({ leaderInAccessScopes }) => leaderInAccessScopes)
    .some(
      (scope) =>
        scope.subordinateUserGroupId === accessOverUserGroupId &&
        scope.type === userGroupManagementAccessScopeType,
    );
}
