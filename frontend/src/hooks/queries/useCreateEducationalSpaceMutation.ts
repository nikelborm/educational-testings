import { useMutation, useQueryClient } from 'react-query';
import type { CreateEducationalSpaceDTO, EmptyResponseDTO } from 'backendTypes';
import { customFetch, invalidatePassthrough, useTokenPairUpdater } from 'utils';

export function useCreateEducationalSpaceMutation(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { requestTokenPairRefreshing } = useTokenPairUpdater();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (newEducationalSpace: CreateEducationalSpaceDTO) =>
      customFetch<EmptyResponseDTO>('educationalSpace/create', {
        method: 'POST',
        body: newEducationalSpace,
      })
        .then(invalidatePassthrough(queryClient, 'useMyEducationalSpaces'))
        .then(requestTokenPairRefreshing),
    { onSuccess },
  );
  return {
    sendCreateEducationalSpaceQuery: mutate,
    isLoading,
    isError,
    isSuccess,
  };
}
