import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetAvailableForLaunchTestingsDTO } from 'backendTypes';

export function useAvailableToLaunchAbstractTestings(
  educationalSpaceId: number,
) {
  const { isLoading, isError, isSuccess, data, refetch } = useQuery(
    ['useAvailableToLaunchAbstractTestings', educationalSpaceId],
    () =>
      customFetch<GetAvailableForLaunchTestingsDTO>(
        'abstractTesting/availableToLaunchIn',
        {
          params: { educationalSpaceId },
          method: 'GET',
        },
      ),
    { enabled: false },
  );
  return {
    isLoading,
    isError,
    isSuccess,
    refetch,
    abstractTestings: data?.availableForLaunchTestings,
    userGroups: data?.availableForLaunchInGroups,
  };
}
