import { UserAuthInfo, UserGroupManagementAccessScopeType } from 'src/types';
import { doesUserHaveGroupAccess } from './doesUserHaveGroupAccess';

export const canUserInviteToGroup = (
  inviter: UserAuthInfo,
  groupIdToBeInvitedTo: number,
): boolean =>
  doesUserHaveGroupAccess(
    inviter,
    groupIdToBeInvitedTo,
    UserGroupManagementAccessScopeType.INVITE_USERS,
  );
