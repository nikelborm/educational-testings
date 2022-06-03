import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { useMyEducationalSpaces } from 'hooks';
import { SortOrder } from 'antd/lib/table/interface';
import { renderTags } from 'utils';
import { RoutesEnum } from 'types';

export function MyEducationalSpaces() {
  const navigate = useNavigate();
  const { myEducationalSpaces } = useMyEducationalSpaces();

  return (
    <Table
      tableLayout="fixed"
      dataSource={myEducationalSpaces?.map((space) => ({
        ...space,
        key: space.id,
      }))}
      pagination={false}
      style={{ marginTop: '24px' }}
      onRow={(record) => ({
        onClick: () => {
          navigate(
            `/account/${RoutesEnum.EDUCATIONAL_SPACE_VIEW}?id=${record.id}`,
          );
        },
      })}
      columns={[
        {
          title: 'Название',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          sortDirections: ['ascend', 'descend'] as SortOrder[],
          width: '30%',
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
          width: '40%',
        },
        {
          title: 'Группы, в которых вы состоите',
          dataIndex: 'userGroups',
          key: 'userGroups',
          width: '30%',
          render: (_, dataUsedForRowRender) =>
            renderTags(dataUsedForRowRender.userGroups.map(({ name }) => name)),
        },
      ]}
    />
  );
}
