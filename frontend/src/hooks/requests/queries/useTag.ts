import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { SingleTagResponseDTO } from 'backendTypes';

export function useTag(tagId: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['useTag', tagId],
    () =>
      customFetch<SingleTagResponseDTO>('tag/oneById', {
        method: 'GET',
        needsAccessToken: false,
        params: { id: tagId },
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    tag: data?.tag,
  };
}
