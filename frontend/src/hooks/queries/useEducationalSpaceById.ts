import { useQuery } from 'react-query';
import { customFetch } from 'utils';

export function useEducationalSpaceBy(id: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['useEducationalSpaceById', id],
    () =>
      customFetch<{
        educationalSpace: {
          id: number;
          name: string;
          description?: string;
        };
      }>('educationalSpace/getOneBy', {
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
