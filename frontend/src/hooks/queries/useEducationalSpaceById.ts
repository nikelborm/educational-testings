import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetEducationalSpaceDTO } from '@backendTypes';

export function useEducationalSpaceBy(id: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['useEducationalSpaceById', id],
    () =>
      customFetch<GetEducationalSpaceDTO>('educationalSpace/getOneBy', {
        params: { id },
        method: 'GET',
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    educationalSpace: data?.educationalSpace,
  };
}
