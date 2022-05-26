import { useMutation, useQueryClient } from 'react-query';
import { customFetch, invalidatePassthrough, validate } from 'utils';
// eslint-disable-next-line import/no-duplicates
import { EmptyResponseDTO } from 'backendTypes';
// eslint-disable-next-line import/no-duplicates
import { UseInviteLinkDTO } from 'backendTypes';

export function useInviteLinkMutation(
  onError: () => void,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (inviteLinkPayload: UseInviteLinkDTO) =>
      validate(inviteLinkPayload, UseInviteLinkDTO).length
        ? Promise.reject(new Error('Validation error'))
        : customFetch<EmptyResponseDTO>('educationalSpace/useInvite', {
            method: 'POST',
            body: inviteLinkPayload,
          }).then(invalidatePassthrough(queryClient, 'useMyEducationalSpaces')),
    { onSuccess, onError },
  );
  return { sendJoinToGroupQuery: mutate, isLoading, isError, isSuccess };
}
