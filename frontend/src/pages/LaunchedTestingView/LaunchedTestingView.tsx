import { useIdSearchParam } from 'hooks';
import { RoutesEnum } from 'types';

export function LaunchedTestingView() {
  const launchedTestingId = useIdSearchParam(RoutesEnum.MY_EDUCATIONAL_SPACES);
  return <div />;
}
