import { Typography } from 'antd';

export function AboutAbstractTesting({
  goal,
  name,
  description,
}: {
  name: string;
  goal: string;
  description?: string;
}) {
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
        О тестировании
      </Typography.Title>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Название
      </Typography.Title>
      <p>{name}</p>

      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Цель
      </Typography.Title>
      <p>{goal}</p>

      {description && (
        <>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Описание
          </Typography.Title>
          <p>{description}</p>
        </>
      )}
    </div>
  );
}
