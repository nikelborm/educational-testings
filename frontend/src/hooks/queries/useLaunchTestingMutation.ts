import { useMutation, useQueryClient } from 'react-query';
import {
  customFetch,
  displayErrorNotification,
  invalidatePassthrough,
  validate,
} from 'utils';
import { LaunchTestingDTO, EmptyResponseDTO } from 'backendTypes';
import { message } from 'antd';

export function useLaunchTestingMutation(
  onSuccess: () => void,
  onError?: (err: any) => void,
) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (launchTestingDTO: LaunchTestingDTO) => {
      const errors = validate(launchTestingDTO, LaunchTestingDTO);
      console.log(errors);
      return customFetch<EmptyResponseDTO>('abstractTesting/launch', {
        method: 'POST',
        body: launchTestingDTO,
      }).then(invalidatePassthrough(queryClient, 'useEducationalSpaceById'));
    },
    {
      onSuccess: () => {
        void message.success('You sucessfully launched the testing');
        onSuccess();
      },
      onError: (err) => {
        displayErrorNotification(err);
        onError?.(err);
      },
    },
  );
  return { sendLaunchTestingQuery: mutate, isLoading, isError, isSuccess };
}
