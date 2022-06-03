import { LaunchedTestingAccessScopeType } from 'backendTypes';
import { ISession } from 'types';

export const doesUserHaveAccessInLaunchedTesting =
  (session: ISession, launchedTestingId: number) =>
  (type: LaunchedTestingAccessScopeType) =>
    session.isAuthed &&
    session.accessToken.payload.user.userGroups.some((group) =>
      group.launchedTestingAccessScopes.some(
        (scope) =>
          scope.launchedTestingId === launchedTestingId && scope.type === type,
      ),
    );
