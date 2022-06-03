import { LaunchedTestingAccessScopeType, UserAuthInfo } from 'src/types';

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
