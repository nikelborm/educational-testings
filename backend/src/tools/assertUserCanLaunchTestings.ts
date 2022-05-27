import { BadRequestException } from '@nestjs/common';
import { messages } from 'src/config';
import { EducationalSpaceAccessScopeType, UserAuthInfo } from 'src/types';
import { doesUserHaveSpaceAccess } from './doesUserHaveSpaceAccess';

export const assertUserCanLaunchTestings = (
  user: UserAuthInfo,
  educationalSpaceId: number,
): void => {
  const canUserLaunchTestings = doesUserHaveSpaceAccess(
    user.userGroups.filter(
      ({ educationalSpaceId: id }) => id === educationalSpaceId,
    ),
    EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
  );

  if (!canUserLaunchTestings)
    throw new BadRequestException(
      messages.launchedTestings.cantLaunchWithoutAccess,
    );
};
