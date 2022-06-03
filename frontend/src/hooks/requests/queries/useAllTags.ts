import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { GetManyTagsResponseDTO } from 'backendTypes';

export function useAllTags() {
  const { isLoading, isError, isSuccess, data } = useQuery('useAllTags', () =>
    customFetch<GetManyTagsResponseDTO>('tag/all', {
      method: 'GET',
      needsAccessToken: false,
    }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    tags: data?.tags,
  };
}
