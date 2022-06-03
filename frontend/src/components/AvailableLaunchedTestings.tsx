import { Table, Typography } from 'antd';
import {
  EducationalSpaceAccessScopeType,
  LaunchedTestingAccessScopeType,
  LaunchedTestingInsideEducationalSpaceFromDBDTO,
} from 'backendTypes';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'types';
import { renderTags, useSession } from 'utils';

export function AvailableLaunchedTestings({
  launchedTestings,
  educationalSpaceId,
}: {
  educationalSpaceId: number;
  launchedTestings?: LaunchedTestingInsideEducationalSpaceFromDBDTO[];
}) {
  const navigate = useNavigate();
  const session = useSession();

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Доступные вам запущенные тестирования
      </Typography.Title>
      <Table
        tableLayout="fixed"
        dataSource={launchedTestings?.map((launchedTesting) => ({
          ...launchedTesting,
          key: launchedTesting.id,
        }))}
        pagination={false}
        style={{ margin: '24px 0' }}
        onRow={(record) => ({
          onClick: () => {
            navigate(
              `/account/${RoutesEnum.LAUNCHED_TESTING_VIEW}?id=${record.id}`,
            );
          },
        })}
        columns={[
          {
            title: 'Название абстрактного тестирования',
            dataIndex: 'abstractTesting.name',
            render: (_, data) => data.abstractTesting.name,
            key: 'name',
          },
          {
            title: 'Дата открытия тестирования',
            dataIndex: 'openingDate',
            key: 'openingDate',
            width: '20%',
          },
          {
            title: 'Дата закрытия тестирования',
            dataIndex: 'closingDate',
            key: 'closingDate',
            width: '20%',
          },
          {
            title: 'Ваши права в тестировании',
            dataIndex: 'rights',
            render: (_, data) =>
              renderTags([
                ...(session.isAuthed &&
                session.accessToken.payload.user.userGroups.some((group) =>
                  group.launchedTestingAccessScopes.some(
                    (scope) =>
                      scope.launchedTestingId === data.id &&
                      scope.type ===
                        LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
                  ),
                )
                  ? ['Проходить тестирование']
                  : []),
                ...(session.isAuthed &&
                session.accessToken.payload.user.userGroups.some((group) =>
                  group.launchedTestingAccessScopes.some(
                    (scope) =>
                      scope.launchedTestingId === data.id &&
                      scope.type ===
                        LaunchedTestingAccessScopeType.VIEW_ANALYTICS,
                  ),
                )
                  ? ['Смотреть аналитику по всем прошедшим']
                  : []),
                ...(session.isAuthed &&
                session.accessToken.payload.user.userGroups.some((group) =>
                  group.launchedTestingAccessScopes.some(
                    (scope) =>
                      scope.launchedTestingId === data.id &&
                      scope.type ===
                        LaunchedTestingAccessScopeType.VIEW_USERS_FINISHED_TESTING,
                  ),
                )
                  ? ['Смотреть список тех, кто прошёл тестирование']
                  : []),
                ...(session.isAuthed &&
                session.accessToken.payload.user.userGroups.some(
                  (group) =>
                    group.educationalSpaceId === educationalSpaceId &&
                    group.educationalSpaceAccessScopes.some(
                      (scope) =>
                        scope.type ===
                        EducationalSpaceAccessScopeType.VIEW_LAUNCHED_TESTINGS,
                    ),
                )
                  ? ['Видеть все запущенные тестирования']
                  : []),
              ]),
            key: 'rights',
          },
        ]}
      />
    </>
  );
}
