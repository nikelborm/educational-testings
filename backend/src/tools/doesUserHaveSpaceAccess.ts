import {
  EducationalSpaceAccessScopeType,
  UserAuthInfoTrimmedUserGroup,
} from 'src/types';

export function doesUserHaveSpaceAccess(
  userGroupsFromSingleSpace: UserAuthInfoTrimmedUserGroup[],
  SpaceLevelAccessScopeType: EducationalSpaceAccessScopeType,
): boolean {
  return userGroupsFromSingleSpace.some((group) =>
    group.educationalSpaceAccessScopes.some(
      (scope) => scope.type === SpaceLevelAccessScopeType,
    ),
  );
}
