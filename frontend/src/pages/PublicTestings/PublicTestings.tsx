import { Card, Col, Row } from 'antd';
import { usePublicTestings } from 'hooks';
import { Link } from 'react-router-dom';
import { RoutesEnum } from 'types';

export function PublicTestings() {
  const { abstractTestings } = usePublicTestings();
  return (
    <Row gutter={[16, 16]}>
      {abstractTestings?.map(({ description, id, name, goal }) => (
        <Col span={8} key={id}>
          <Link to={`/account/${RoutesEnum.LAUNCHED_TESTING_VIEW}?id=${id}`}>
            <Card title={name}>
              <p style={{ fontWeight: 'bold' }}>Цель:</p>
              <p>{goal}</p>
              {description && (
                <>
                  <p style={{ fontWeight: 'bold' }}>Описание:</p>
                  <p>{description}</p>
                </>
              )}
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
