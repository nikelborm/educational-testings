import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetLaunchedTestingResponseDTO } from 'backendTypes';

export function useLaunchedTestingById(id: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['useLaunchedTestingById', id],
    () =>
      // TODO оказывается реакт квери поставляет уже сама аборт сигнал так что его только вшить надо в customFetch
      customFetch<GetLaunchedTestingResponseDTO>(
        'launchedTesting/getLaunchedTestingById',
        {
          params: { id },
          method: 'GET',
        },
      ),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    launchedTesting: data?.launchedTesting,
  };
}
