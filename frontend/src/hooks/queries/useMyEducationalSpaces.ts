import { useQuery, useQueryClient } from 'react-query';
import { customFetch } from 'utils';
import { GetMyEducationalSpacesResponseDTO } from 'backendTypes';

export function useMyEducationalSpaces() {
  const queryClient = useQueryClient();
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
