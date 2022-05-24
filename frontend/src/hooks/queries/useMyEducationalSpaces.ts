import { useQuery } from 'react-query';
import { customFetch } from 'utils';

export function useMyEducationalSpaces() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    'useMyEducationalSpaces',
    () =>
      customFetch<{
        myEducationalSpaces: {
          id: number;
          name: string;
          description?: string;
          userGroups: {
            id: number;
            name: string;
          }[];
        }[];
      }>('educationalSpace/getMine', {
        method: 'GET',
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    myEducationalSpaces: data?.myEducationalSpaces,
  };
}
