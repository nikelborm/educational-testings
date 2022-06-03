import { Typography } from 'antd';
import { useIdSearchParam, useTag } from 'hooks';
import { RoutesEnum } from 'types';

export function TagView() {
  const tagId = useIdSearchParam(RoutesEnum.EXISTING_TAGS);
  const { tag } = useTag(tagId);

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Название
      </Typography.Title>
      <p>{tag?.name}</p>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Описание
      </Typography.Title>
      <p>{tag?.description}</p>
    </>
  );
}
