import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetMyEducationalSpacesResponseDTO } from '@backendTypes';

export function useMyEducationalSpaces() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    'useMyEducationalSpaces',
    () =>
      customFetch<GetMyEducationalSpacesResponseDTO>(
        'educationalSpace/getMine',
        { method: 'GET' },
      ),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    myEducationalSpaces: data?.myEducationalSpaces,
  };
}
