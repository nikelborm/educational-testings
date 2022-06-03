import { BadRequestException } from '@nestjs/common';
import { messages } from 'src/config';
import {
  EducationalSpaceAccessScopeType,
  LaunchTestingAccessScopeDTO,
  UserAuthInfo,
  UserGroupManagementAccessScopeType,
} from 'src/types';
import { doesUserHaveSpaceAccess } from './doesUserHaveSpaceAccess';

export const assertUserCanLaunchTestings = (
  user: UserAuthInfo,
  educationalSpaceId: number,
  mode:
    | {
        canUserLaunchFor: 'somebody';
      }
    | {
        canUserLaunchFor: 'specificGroups';
        scopesToCheck: LaunchTestingAccessScopeDTO[];
      },
): void => {
  const canUserLaunchTestings = doesUserHaveSpaceAccess(
    user.userGroups.filter(
      ({ educationalSpaceId: id }) => id === educationalSpaceId,
    ),
    EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
  );

  let shouldThrowError: () => boolean;

  if (mode.canUserLaunchFor === 'specificGroups') {
    const possibleAccessScopesRelatedToTestingsLaunch = user.userGroups
      .flatMap(({ leaderInAccessScopes }) => leaderInAccessScopes)
      .filter(
        ({ type }) =>
          type === UserGroupManagementAccessScopeType.LAUNCH_TESTING,
      );

    const doesUserCanLaunchTestingsInEachGroup = mode.scopesToCheck?.length
      ? mode.scopesToCheck.every(({ userGroupId }) =>
          possibleAccessScopesRelatedToTestingsLaunch.some(
            ({ subordinateUserGroupId }) =>
              userGroupId === subordinateUserGroupId,
          ),
        )
      : false;
    shouldThrowError = (): boolean =>
      !canUserLaunchTestings && !doesUserCanLaunchTestingsInEachGroup;
  } else {
    shouldThrowError = (): boolean => !canUserLaunchTestings;
  }

  if (shouldThrowError())
    throw new BadRequestException(
      messages.launchedTestings.cantLaunchWithoutAccess,
    );
};
