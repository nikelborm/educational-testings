import { useMutation, useQueryClient } from 'react-query';
import type { CreateEducationalSpaceDTO, EmptyResponseDTO } from 'backendTypes';
import { customFetch, invalidatePassthrough } from 'utils';

export function useCreateEducationalSpaceMutation(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (newEducationalSpace: CreateEducationalSpaceDTO) =>
      customFetch<EmptyResponseDTO>('educationalSpace/create', {
        method: 'POST',
        body: newEducationalSpace,
      }).then(invalidatePassthrough(queryClient, 'useMyEducationalSpaces')),
    { onSuccess },
  );
  return {
    sendCreateEducationalSpaceQuery: mutate,
    isLoading,
    isError,
    isSuccess,
  };
}
