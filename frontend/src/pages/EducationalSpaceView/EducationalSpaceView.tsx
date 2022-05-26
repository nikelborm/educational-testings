import { CopyOutlined } from '@ant-design/icons';
import { Button, message, Table } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import { SERVER_ADRESS } from 'constant';
import { useEducationalSpaceBy } from 'hooks';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'types';
import { copyTextToClipboard } from 'utils';

export function EducationalSpaceView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = parseInt(searchParams.get('id') as string, 10);
  useEffect(() => {
    if (Number.isNaN(id))
      navigate(`/account/${RoutesEnum.MY_EDUCATIONAL_SPACES}`);
  }, [id]);

  const { educationalSpace } = useEducationalSpaceBy(id);

  return (
    <div>
      id: {educationalSpace?.id} <br />
      name: {educationalSpace?.name} <br />
      description: {educationalSpace?.description} <br />
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
            navigate(`/account/${RoutesEnum.USER_GROUP_VIEW}?id=${record.id}`);
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
      Full: <pre>{JSON.stringify(educationalSpace, undefined, 4)}</pre> <br />
    </div>
  );
}
