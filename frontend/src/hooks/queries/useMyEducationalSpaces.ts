import { useQuery } from 'react-query';
import { customFetch } from 'utils';

export function useMyEducationalSpaces() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    'useMyEducationalSpaces',
    () =>
      customFetch<
        {
          id: number;
          name: string;
          description?: string;
        }[]
      >('educationalSpace/getMine', {
        method: 'GET',
      }),
  );
  return { isLoading, isError, isSuccess, data };
}
