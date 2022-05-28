import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetPublicAbstractTestings } from 'backendTypes';

export function usePublicTestings() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    'usePublicTestings',
    () =>
      customFetch<GetPublicAbstractTestings>('abstractTesting/getPublic', {
        method: 'GET',
        needsAccessToken: false,
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    abstractTestings: data?.abstractTestings,
  };
}
