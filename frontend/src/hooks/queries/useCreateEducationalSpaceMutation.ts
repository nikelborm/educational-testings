import { useMutation, useQueryClient } from 'react-query';
import { ITokenPair } from 'types';
import { customFetch } from 'utils';

export function useCreateEducationalSpaceMutation() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (newEducationalSpace: { name: string; description?: string | undefined }) =>
      customFetch<ITokenPair>('educationalSpace/create', {
        method: 'POST',
        needsAccessToken: false,
        body: newEducationalSpace,
      }),
  );
  return { sendLoginQuery: mutate, isLoading, isError, isSuccess };
}
