import React from 'react';
import { ISession } from './localStorageAuth';

export enum RoutesEnum {
  /*  1 */ LOGIN = 'login',
  /*  2 */ REGISTRATION = 'registration',
  /*  3 */ USER_SETTINGS = 'userSettings',
  /*  4 */ MY_EDUCATIONAL_SPACES = 'myEducationalSpaces',
  /*  5 */ EDUCATIONAL_SPACE_VIEW = 'educationalSpaceView',

  /*  6 */ EDUCATIONAL_SPACE_EDIT = 'educationalSpaceEdit',
  /*  7 */ USER_GROUP_VIEW = 'userGroupView',
  /*  8 */ USER_GROUP_EDIT = 'userGroupEdit',
  /*  9 */ AVAILABLE_TESTINGS = 'availableTestings',
  /* 10 */ LAUNCHED_TESTING_VIEW = 'launchedTestingView',
  /* 11 */ PASSING_TESTING_STAGE = 'passingTestingStage',

  /* 12 */ ERROR_404 = '404',
  /* 13 */ ROOT = '/', // landing
  /* 14 */ PUBLIC_TESTINGS = 'publicTestings',
  /* 15 */ ATTEMPT_VIEW = 'attemptView',
  /* 16 */ LAUNCHED_TESTING_ANALYTICS = 'launchedTestingAnalytics',
  /* 17 */ EXISTING_TAGS = 'existingTags',
  /* 18 */ USE_INVITE_LINK = 'useInviteLink',
  /* 19 */ TAG_VIEW = 'tagView',

  /* __ */ ABSTRACT_TESTING_DEMO_PASSING = 'abstractTestingDemoPassing',
}

export interface SimpleRouteEntity {
  Component: React.FC<React.PropsWithChildren<any>>;
}

export interface AuthedRouteEntity extends SimpleRouteEntity {
  Component: React.FC<React.PropsWithChildren<any>>;
  isMenuPoint?: boolean;
  menuTitle?: React.ReactNode;
  pageTitle?: React.ReactNode;
  description?: React.ReactNode;
  Extras?: React.FC<React.PropsWithChildren<any>>;
  menuIcon?: React.ReactElement;
  canUserOpenThisRoute(session: ISession): boolean;
}

export type RoutesMap<T> = {
  [route in RoutesEnum]?: T;
};
