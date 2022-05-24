import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { useMyEducationalSpaces } from 'hooks';
import { SortOrder } from 'antd/lib/table/interface';
import renderKeywords from 'utils/renderKeywords';

export function MyEducationalSpaces() {
  const navigate = useNavigate();
  const { myEducationalSpaces } = useMyEducationalSpaces();

  return (
    <Table
      tableLayout="fixed"
      dataSource={myEducationalSpaces}
      pagination={false}
      style={{ marginTop: '24px' }}
      onRow={(record) => ({
        onClick: () => {
          navigate(`/account/educationalSpaceView?id=${record.id}`);
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
          sortDirections: ['ascend', 'descend'] as SortOrder[],
          width: '40%',
        },
        {
          title: 'Your groups',
          dataIndex: 'userGroups',
          key: 'userGroups',
          width: '30%',
          render: (_, dataUsedForRowRender) =>
            renderKeywords(
              dataUsedForRowRender.userGroups.map(({ name }) => name),
            ),
        },
      ]}
    />
  );
}
