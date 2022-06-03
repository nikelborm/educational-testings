import { BadRequestException } from '@nestjs/common';
import { messages } from 'src/config';
import {
  EducationalSpaceAccessScopeType,
  LaunchTestingAccessScopeDTO,
  UserAuthInfo,
  UserGroupManagementAccessScopeType,
} from 'src/types';
import { doesUserHaveGroupAccess } from './doesUserHaveGroupAccess';
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
    user,
    educationalSpaceId,
    EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
  );

  let shouldThrowError: () => boolean;

  if (mode.canUserLaunchFor === 'specificGroups') {
    const doesUserCanLaunchTestingsInEachGroup = mode.scopesToCheck?.length
      ? mode.scopesToCheck.every(({ userGroupId }) =>
          doesUserHaveGroupAccess(
            user,
            userGroupId,
            UserGroupManagementAccessScopeType.LAUNCH_TESTING,
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
