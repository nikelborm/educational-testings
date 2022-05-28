import { CopyOutlined } from '@ant-design/icons';
import { Button, message, Table, Typography } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import { SERVER_ADRESS } from 'constant';
import { useEducationalSpaceBy, useIdSearchParam } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'types';
import { copyTextToClipboard } from 'utils';

export function EducationalSpaceView() {
  const navigate = useNavigate();

  const educationalSpaceId = useIdSearchParam(RoutesEnum.MY_EDUCATIONAL_SPACES);

  const { educationalSpace } = useEducationalSpaceBy(educationalSpaceId);

  return (
    <div>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Name
      </Typography.Title>
      <p>{educationalSpace?.name}</p>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Description
      </Typography.Title>
      <p>{educationalSpace?.description}</p>
      <Typography.Title level={4}>Available groups</Typography.Title>
      <p>
        <Table
          tableLayout="fixed"
          dataSource={educationalSpace?.userGroups.map((space) => ({
            ...space,
            key: space.id,
          }))}
          pagination={false}
          style={{ marginTop: '24px' }}
          onRow={(record) => ({
            onClick: () => {
              navigate(
                `/account/${RoutesEnum.USER_GROUP_VIEW}?id=${record.id}`,
              );
            },
          })}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: (a, b) => a.name.localeCompare(b.name),
              sortDirections: ['ascend', 'descend'] as SortOrder[],
              width: '20%',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              width: '40%',
            },
            {
              title: 'Ссылка для приглашения',
              dataIndex: 'inviteLink',
              key: 'inviteLink',
              render: (_, dataUsedForRowRender) =>
                dataUsedForRowRender.inviteLinkPayload ? (
                  <Button
                    type="primary"
                    onClick={(event) => {
                      event.stopPropagation();
                      copyTextToClipboard(
                        /* eslint-disable prettier/prettier */
                        `${SERVER_ADRESS}/account/${
                          RoutesEnum.USE_INVITE_LINK
                        }?givenByUserId=${
                          dataUsedForRowRender.inviteLinkPayload?.givenByUserId
                        }&expirationDate=${
                          dataUsedForRowRender.inviteLinkPayload?.expirationDate
                        }&inviteToUserGroupId=${
                          dataUsedForRowRender.inviteLinkPayload?.inviteToUserGroupId
                        }&signature=${
                          dataUsedForRowRender.inviteLinkPayload?.signature
                        }`,
                        /* eslint-enable prettier/prettier */
                        () =>
                          void message.success(
                            'Invite link to group successfully copied',
                          ),
                        () =>
                          void message.error(
                            'Unable to copy invite link to your clipboard',
                          ),
                      );
                    }}
                  >
                    <CopyOutlined />
                    Copy!
                  </Button>
                ) : null,
              width: '40%',
            },
          ]}
        />
      </p>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Available launched testings
      </Typography.Title>
      <p>
        <Table
          tableLayout="fixed"
          dataSource={educationalSpace?.launchedTestings.map(
            (launchedTesting) => ({
              ...launchedTesting,
              key: launchedTesting.id,
            }),
          )}
          pagination={false}
          style={{ marginTop: '24px' }}
          onRow={(record) => ({
            onClick: () => {
              navigate(
                `/account/${RoutesEnum.LAUNCHED_TESTING_VIEW}?id=${record.id}`,
              );
            },
          })}
          columns={[
            {
              title: 'Название тестирования',
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
              title: 'Описание тестирования',
              dataIndex: 'abstractTesting.goal',
              render: (_, data) => data.abstractTesting.goal,
              key: 'name',
            },
          ]}
        />
      </p>
    </div>
  );
}
