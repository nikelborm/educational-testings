import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { useMyEducationalSpaces } from 'hooks';
import { SortOrder } from 'antd/lib/table/interface';

export function MyEducationalSpaces() {
  const navigate = useNavigate();
  const { data: myEducationalSpaces } = useMyEducationalSpaces();

  const columns = [
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
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend'] as SortOrder[],
      width: '60%',
    },
  ];

  return (
    <div>
      MyEducationalSpaces
      <Table
        tableLayout="fixed"
        onRow={(record) => ({
          onClick: () => {
            navigate(`/account/educationalSpaceView?id=${record.id}`);
          },
        })}
        dataSource={myEducationalSpaces}
        columns={columns}
        pagination={false}
        style={{ marginTop: '24px' }}
      />
    </div>
  );
}
