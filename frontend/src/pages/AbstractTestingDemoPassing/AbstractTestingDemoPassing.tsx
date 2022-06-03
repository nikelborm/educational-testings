import { PassingAttemptManager } from 'components';
import { useAbstractTestingForDemoPassing, useIdSearchParam } from 'hooks';
import { RoutesEnum } from 'types';

export function AbstractTestingDemoPassing() {
  const abstractTestingId = useIdSearchParam(RoutesEnum.PUBLIC_TESTINGS);
  const { isLoading, abstractTesting } =
    useAbstractTestingForDemoPassing(abstractTestingId);

  return (
    <>
      {isLoading && 'Загрузка...'}
      {abstractTesting && (
        <PassingAttemptManager abstractTesting={abstractTesting} />
      )}
    </>
  );
}
