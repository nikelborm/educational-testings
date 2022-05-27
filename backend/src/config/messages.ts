import { pluralForm, startsWithCapital } from 'src/tools';

const messagesRepeating = {
  notEnoughAccess: 'Not enough access level to',
  moreThanOne: "There's more than one",
  validationError: 'Validation error:',
};

export const messages = {
  auth: {
    incorrectUser: 'User with this email was not found',
    incorrectPassword: 'Incorrect password',
    userHasNoAccessScopes:
      'This user has no access scopes. \nThe user is not assigned to any access scope and has no additional role. \nPlease contact the administrator',
    developmentOnly: 'Development only',
    unauthorizedOnly: 'You should not be authorized to use this route',
    missingAuthHeader: 'Missing Authorization header (with Token)',
    incorrectTokenType: 'Token type should be Bearer',
    missingToken: `Missing Token in Authorization header`,
    sessionExpired: 'Your session has been expired',
    invalidAccessToken:
      'Access token in Authorization header is not a valid JWT token',
    yourSessionWasFinished:
      'Your session was finished because of long inactivity.\nIf you used your account less than a week ago, your account can be hacked.\nPlease open your settings and click the "Logout on all devices" button',
    invalidRefreshToken:
      'Refresh Token tried to be used from that moment is not a valid JWT token, try requesting a new one',
  },
  user: {
    exists: 'User with this email already exists',
    cantCreateEducationalSpace:
      'You cannot create educational space for now. You need to activate checkbox in your settings to change your account type',
    alreadyInvited: 'You are already a member of a group you tried to join',
    didntCreateAbstractTesting:
      'You are not an author of this abstract testing, for this reason you cannot add it to educational space catalog',
  },
  educationalSpace: {
    cantView: `${messagesRepeating.notEnoughAccess} view this educational space. \nThis Account was not found in any group of this educational space. \nTry to ask space owners for invite link`,
    incorrectInviteSignature: 'Your invite link has incorrect signature',
    inviteLinkExpired: 'Your invite link has been expired',
    inviterLostAccessToInvitePeople:
      'User which created this invite link doesnt have access to invite people to this group',
  },
  accessScope: {
    cannotPromoteYourself: 'Cannot set additional role for yourself',
  },
  abstractTesting: {
    alreadyAddedToSpace:
      'This abstract testing was already added to educational space',
  },
  launchedTestings: {
    cantLaunchWithoutAccess:
      'You are not a member of any group with access to testings launch',
    wasntAddedToCatalog:
      "Abstract testing cannot be launched in this educational space because it is private and wasnt added to catalog of the space by testing's creator",
  },
  types: {
    shouldBeDate: 'Validation failed. Date should be in ISO format',
  },
  repo: {
    user: {
      cantGetNotFoundBy: (email: string): string =>
        `User with email={${email}} was not found`,
    },
    common: {
      cantCreateWithId: (entity: any, entityName?: string): string =>
        `Can\`t create an ${
          entityName || 'entity'
        }: there's an id specified where it should not be. JSON: ${JSON.stringify(
          entity,
        )}`,
      cantCreateWithIds: (entities: any[], entityName?: string): string =>
        `Can\`t create ${pluralForm(
          entityName || 'entity',
        )}: there are ids specified where they should not be. JSON: ${JSON.stringify(
          entities,
        )}`,
      cantUpdateWithoutId: (entity: any, entityName?: string): string =>
        `Can\`t update an ${
          entityName || 'entity'
        }: there is no id specified where it should. JSON: ${JSON.stringify(
          entity,
        )}`,
      cantUpdateWithoutIds: (entities: any[], entityName?: string): string =>
        `Can\`t update an ${pluralForm(
          entityName || 'entity',
        )}: there are no ids specified where they should be. JSON: ${JSON.stringify(
          entities,
        )}`,
      cantDeleteWithoutId: (entity: any, entityName?: string): string =>
        `Can\`t delete an ${
          entityName || 'entity'
        }: there is no id specified where it should be. JSON: ${JSON.stringify(
          entity,
        )}`,
      cantDeleteWithoutIds: (entities: any[], entityName?: string): string =>
        `Can\`t delete an ${pluralForm(
          entityName || 'entity',
        )}: there is no id specified where it should be. JSON: ${JSON.stringify(
          entities,
        )}`,
      cantGetNotFoundById: (id: number, entityName?: string): string =>
        `${startsWithCapital(
          entityName || 'entity',
        )} with id={${id}} was not found`,
      cantGetNotFoundByUUID: (uuid: string, entityName?: string): string =>
        `${startsWithCapital(
          entityName || 'entity',
        )} with uuid={${uuid}} was not found`,
      cantUpdateOneNotFound: (id: number, entityName?: string): string =>
        `Cannot update ${
          entityName || 'entity'
        } with id={${id}}, because it does not exist`,
      cantUpdateManyNotFound: (
        wantedToUpdateEntityIds: number[],
        notExistingEntityIds: number[],
        entityName?: string,
      ): string =>
        `Cannot update ${pluralForm(
          entityName || 'entity',
        )} with ids={${wantedToUpdateEntityIds.join()}}, because some ${
          entityName || 'entity'
        }s with ids={${notExistingEntityIds.join()}} does not exist`,
      cantCreateOne: (newEntity: any, entityName?: string): string =>
        `Unable to create new ${entityName || 'entity'} JSON: {${JSON.stringify(
          newEntity,
        )}}`,
      cantCreateMany: (newEntities: any[], entityName?: string): string =>
        `Unable to insert ${pluralForm(
          entityName || 'entity',
        )}. JSON: {${JSON.stringify(newEntities)}}`,
    },
  },
};
