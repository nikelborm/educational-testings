/* eslint-disable prettier/prettier */
import { useMutation } from 'react-query';
import { ITokenPair } from 'types';
import { customFetch, useTokenPairUpdater } from 'utils';

export function useRegistrationMutation() {
  const { updateTokenPair } = useTokenPairUpdater();
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    ({
      confirm,
      ...user
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      patronymic: string;
      gender: string;
      canCreateEducationalSpaces: boolean;
      confirm: string;
    }) =>
      user.password === confirm
        ? customFetch<ITokenPair>('auth/local/register', {
          method: 'POST',
          needsAccessToken: false,
          body: user,
        }).then(updateTokenPair)
        : Promise.reject(new Error('Passwords does not match!')),
  );
  return { sendRegistrationQuery: mutate, isLoading, isError, isSuccess };
}
