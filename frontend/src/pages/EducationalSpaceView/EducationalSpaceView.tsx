import { Table } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import { useEducationalSpaceBy } from 'hooks';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'types';

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
            width: '30%',
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
            width: '40%',
          },
        ]}
      />
      Full: <pre>{JSON.stringify(educationalSpace, undefined, 4)}</pre> <br />
    </div>
  );
}
