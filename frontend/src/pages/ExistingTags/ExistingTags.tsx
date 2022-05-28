import { FolderAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { useAllTags } from 'hooks';
import { Link } from 'react-router-dom';
import { RoutesEnum } from 'types';

export function ExistingTags() {
  const { tags } = useAllTags();
  return (
    <Row gutter={[16, 16]}>
      {tags?.map(({ description, id, name }) => (
        <Col span={8} key={id}>
          <Link to={`/account/${RoutesEnum.TAG_VIEW}?id=${id}`}>
            <Card title={name}>{description}</Card>
          </Link>
        </Col>
      ))}
      <Col span={8}>
        <Card bodyStyle={{ textAlign: 'center' }}>
          <Button type="primary" size="large" icon={<FolderAddOutlined />}>
            Предложить тематику
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
