import { UserAuthInfo, UserGroupManagementAccessScopeType } from 'src/types';

export const canUserInviteToGroup = (
  inviter: UserAuthInfo,
  groupIdToBeInvitedTo: number,
): boolean =>
  inviter.userGroups.some((userGroup) =>
    userGroup.leaderInAccessScopes.some(
      (scope) =>
        scope.subordinateUserGroupId === groupIdToBeInvitedTo &&
        scope.type === UserGroupManagementAccessScopeType.INVITE_USERS,
    ),
  );
