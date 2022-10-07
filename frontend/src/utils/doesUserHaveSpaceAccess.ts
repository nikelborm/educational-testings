import { EducationalSpaceAccessScopeType, UserAuthInfo } from 'backendTypes';

export function doesUserHaveSpaceAccess(
  user: UserAuthInfo,
  educationalSpaceId: number,
  spaceLevelAccessScopeType: EducationalSpaceAccessScopeType,
): boolean {
  return user.userGroups.some(
    (group) =>
      group.educationalSpaceId === educationalSpaceId &&
      group.educationalSpaceAccessScopes.some(
        (scope) => scope.type === spaceLevelAccessScopeType,
      ),
  );
}
