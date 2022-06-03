import { UserAuthInfo, UserGroupManagementAccessScopeType } from 'src/types';

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
