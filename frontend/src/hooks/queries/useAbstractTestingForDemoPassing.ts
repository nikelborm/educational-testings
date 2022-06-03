import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { AbstractTestingForPassingResponseDTO } from 'backendTypes';

export function useAbstractTestingForDemoPassing(id: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['useAbstractTestingForDemoPassing', id],
    () =>
      // TODO оказывается реакт квери поставляет уже сама аборт сигнал так что его тольок вшить надо в customFetch
      customFetch<AbstractTestingForPassingResponseDTO>(
        'abstractTesting/getAbstractTestingForPassingById',
        {
          params: { id },
          method: 'GET',
        },
      ),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    abstractTesting: data?.abstractTesting,
  };
}
