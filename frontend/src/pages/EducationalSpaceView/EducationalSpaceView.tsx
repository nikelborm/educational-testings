import { Typography } from 'antd';
import { AvailableGroups, AvailableLaunchedTestings } from 'components';
import { useEducationalSpaceBy, useIdSearchParam } from 'hooks';
import { RoutesEnum } from 'types';

export function EducationalSpaceView() {
  const educationalSpaceId = useIdSearchParam(RoutesEnum.MY_EDUCATIONAL_SPACES);
  const { educationalSpace } = useEducationalSpaceBy(educationalSpaceId);

  return (
    <div>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Название
      </Typography.Title>
      <p>{educationalSpace?.name}</p>

      {educationalSpace?.description && (
        <>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Описание
          </Typography.Title>
          <p>{educationalSpace?.description}</p>
        </>
      )}

      <AvailableGroups userGroups={educationalSpace?.userGroups} />

      <AvailableLaunchedTestings
        educationalSpaceId={educationalSpaceId}
        launchedTestings={educationalSpace?.launchedTestings}
      />
    </div>
  );
}
