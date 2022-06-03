import {
  QuestionCircleOutlined,
  SettingOutlined,
  SmileOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import {
  Login,
  Registration,
  Root,
  PublicTestings,
  ExistingTags,
  Error404,
  UserSettings,
  MyEducationalSpaces,
  EducationalSpaceView,
  EducationalSpaceEdit,
  UserGroupView,
  UserGroupEdit,
  AvailableTestings,
  LaunchedTestingView,
  PassingTestingStage,
  AttemptView,
  LaunchedTestingAnalytics,
  UseInviteLinkServicePage,
  TagView,
  AbstractTestingDemoPassing,
} from 'pages';
import {
  RoutesEnum,
  AuthedRouteEntity,
  RoutesMap,
  SimpleRouteEntity,
  ISession,
} from 'types';
import {
  CreateEducationalSpaceButtonWithModal,
  LaunchTestingButtonWithModal,
} from 'components';

export const publicRoutes: RoutesMap<SimpleRouteEntity> = {
  [RoutesEnum.ROOT]: {
    Component: Root,
  },
  [RoutesEnum.PUBLIC_TESTINGS]: {
    Component: PublicTestings,
  },
  [RoutesEnum.EXISTING_TAGS]: {
    Component: ExistingTags,
  },
  [RoutesEnum.ERROR_404]: {
    Component: Error404,
  },
};

export const routesOnlyForNotAuthedUsers: RoutesMap<SimpleRouteEntity> = {
  [RoutesEnum.LOGIN]: {
    Component: Login,
  },
  [RoutesEnum.REGISTRATION]: {
    Component: Registration,
  },
};

export const routesOnlyForAuthedUsers: RoutesMap<AuthedRouteEntity> = {
  [RoutesEnum.MY_EDUCATIONAL_SPACES]: {
    Component: MyEducationalSpaces,
    isMenuPoint: true,
    menuIcon: <SmileOutlined />,
    Extras: () => <CreateEducationalSpaceButtonWithModal />,
    menuTitle: 'Мои образов. пространства',
    pageTitle: 'Мои образовательные пространства',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.PUBLIC_TESTINGS]: {
    Component: PublicTestings,
    isMenuPoint: true,
    menuIcon: <QuestionCircleOutlined />,
    menuTitle: 'Публичные тесты',
    pageTitle: 'Публичные тесты',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.EXISTING_TAGS]: {
    Component: ExistingTags,
    isMenuPoint: true,
    menuTitle: 'Все тематики',
    pageTitle: 'Все тематики',
    menuIcon: <TagsOutlined />,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.USER_SETTINGS]: {
    Component: UserSettings,
    isMenuPoint: true,
    menuIcon: <SettingOutlined />,
    menuTitle: 'Настройки пользователя',
    pageTitle: 'Настройки пользователя',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.EDUCATIONAL_SPACE_VIEW]: {
    Component: EducationalSpaceView,
    pageTitle: 'Образовательное пространство',
    description: '(просмотр)',
    Extras: () => <LaunchTestingButtonWithModal />,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.EDUCATIONAL_SPACE_EDIT]: {
    Component: EducationalSpaceEdit,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.TAG_VIEW]: {
    Component: TagView,
    pageTitle: 'Тематика',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.ABSTRACT_TESTING_DEMO_PASSING]: {
    Component: AbstractTestingDemoPassing,
    pageTitle: 'Прохождение теста в демо режиме',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.USER_GROUP_VIEW]: {
    Component: UserGroupView,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.USER_GROUP_EDIT]: {
    Component: UserGroupEdit,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.AVAILABLE_TESTINGS]: {
    Component: AvailableTestings,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.USE_INVITE_LINK]: {
    Component: UseInviteLinkServicePage,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.LAUNCHED_TESTING_VIEW]: {
    Component: LaunchedTestingView,
    pageTitle: 'Launched testing view',
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.PASSING_TESTING_STAGE]: {
    Component: PassingTestingStage,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.ATTEMPT_VIEW]: {
    Component: AttemptView,
    canUserOpenThisRoute: () => true,
  },
  [RoutesEnum.LAUNCHED_TESTING_ANALYTICS]: {
    Component: LaunchedTestingAnalytics,
    canUserOpenThisRoute: () => true,
  },

  // [RoutesEnum.PROFILE]: {
  //   Component: Profile,
  //   isMenuPoint: true,
  //   menuTitle: 'Profile menu item',
  //   pageTitle: 'Profile page header',
  //   description: 'Профиль',
  //   menuIcon: <UserOutlined />,
  // },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAuthedFallbackRoute = (session: ISession) =>
  RoutesEnum.MY_EDUCATIONAL_SPACES;

export const notAuthedFallbackRoute = RoutesEnum.LOGIN;
export const publicFallbackRoute = RoutesEnum.ROOT;
