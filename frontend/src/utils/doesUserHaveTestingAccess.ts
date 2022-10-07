import { LaunchedTestingAccessScopeType, UserAuthInfo } from 'backendTypes';

export function doesUserHaveTestingAccess(
  user: UserAuthInfo,
  launchedTestingId: number,
  testingLevelAccessScopeType: LaunchedTestingAccessScopeType,
): boolean {
  return user.userGroups.some((group) =>
    group.launchedTestingAccessScopes.some(
      ({ launchedTestingId: id, type }) =>
        launchedTestingId === id && type === testingLevelAccessScopeType,
    ),
  );
}
