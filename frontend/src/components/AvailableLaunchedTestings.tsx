import { Table, Typography } from 'antd';
import {
  EducationalSpaceAccessScopeType,
  LaunchedTestingAccessScopeType,
  LaunchedTestingInsideEducationalSpaceFromDBDTO,
} from 'backendTypes';
import { useNavigate } from 'react-router-dom';
import { ISession, RoutesEnum } from 'types';
import { doesUserHaveTestingAccess, renderTags, useSession } from 'utils';

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
            key: 'rights',
            render: (_, data) =>
              renderUserRightsInLaunchedTesting(
                session,
                data.id,
                educationalSpaceId,
              ),
          },
        ]}
      />
    </>
  );
}

function renderUserRightsInLaunchedTesting(
  session: ISession,
  launchedTestingId: number,
  educationalSpaceId: number,
) {
  const tags: string[] = [];
  const doesUserHaveAccessFor = (type: LaunchedTestingAccessScopeType) =>
    session.isAuthed &&
    doesUserHaveTestingAccess(
      session.accessToken.payload.user,
      launchedTestingId,
      type,
    );

  if (
    doesUserHaveAccessFor(LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS)
  )
    tags.push('Проходить тестирование');

  if (doesUserHaveAccessFor(LaunchedTestingAccessScopeType.VIEW_ANALYTICS))
    tags.push('Смотреть аналитику по всем прошедшим');

  if (
    doesUserHaveAccessFor(
      LaunchedTestingAccessScopeType.VIEW_USERS_FINISHED_TESTING,
    )
  )
    tags.push('Смотреть список тех, кто прошёл тестирование');

  if (
    session.isAuthed &&
    session.accessToken.payload.user.userGroups.some(
      (group) =>
        group.educationalSpaceId === educationalSpaceId &&
        group.educationalSpaceAccessScopes.some(
          (scope) =>
            scope.type ===
            EducationalSpaceAccessScopeType.VIEW_LAUNCHED_TESTINGS,
        ),
    )
  )
    tags.push('Видеть все запущенные тестирования');
  return renderTags(tags);
}
