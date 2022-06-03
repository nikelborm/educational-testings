import { CopyOutlined } from '@ant-design/icons';
import { Table, Typography, Button, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import { UserGroupInsideEducationalSpaceResponseDTO } from 'backendTypes';
import { SERVER_ADRESS } from 'constant';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'types';
import { copyTextToClipboard } from 'utils';

export function AvailableGroups({
  userGroups,
}: {
  userGroups?: UserGroupInsideEducationalSpaceResponseDTO[];
}) {
  const navigate = useNavigate();

  return (
    <>
      <Typography.Title level={4}>Доступные вам группы</Typography.Title>
      <Table
        tableLayout="fixed"
        dataSource={userGroups?.map((space) => ({
          ...space,
          key: space.id,
        }))}
        pagination={false}
        style={{ margin: '24px 0' }}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/account/${RoutesEnum.USER_GROUP_VIEW}?id=${record.id}`);
          },
        })}
        columns={[
          {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'] as SortOrder[],
            width: '20%',
          },
          {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
          },
          {
            title: 'Ссылка для приглашения в группу',
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
                  Скопировать!
                  <CopyOutlined />
                </Button>
              ) : null,
            width: '40%',
          },
        ]}
      />
    </>
  );
}
