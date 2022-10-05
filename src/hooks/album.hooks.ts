import {
  ALBUM_QUERY_PAGE_SIZE,
  API_ROUTES,
  DEFAULT_STALE_TIME,
  QUERY_KEYS,
} from '@constants';
import { api } from '@services/api';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import ToastService from '../services/toast.service';

/**
 * Hooks are used to display prefetched data in our page, without passing any data by props.
 */
export const useAlbums = (): UseInfiniteQueryResult<AlbumCollection> => {
  return useInfiniteQuery(
    [QUERY_KEYS.albums],
    async ({ pageParam = 0 }) => {
      const res = (
        await api.get(API_ROUTES.albums, {
          params: {
            take: ALBUM_QUERY_PAGE_SIZE,
            skip: pageParam * ALBUM_QUERY_PAGE_SIZE,
          },
        })
      ).data as AlbumCollection;

      return res;
    },
    {
      getNextPageParam: (prevPage, pages) => {
        const lastPage = Math.ceil(prevPage.total / 10);
        if (pages.length < lastPage) return pages.length;
        return undefined;
      },
      onError: () => {
        ToastService.showSuccess('toasts.error.hooks.useAlbums');
      },
      staleTime: DEFAULT_STALE_TIME,
    }
  );
};

export const useSingleAlbum = (albumId: string): UseQueryResult<Album> => {
  return useQuery(
    [QUERY_KEYS.singleAlbum, albumId],
    () =>
      api
        .get(API_ROUTES.singleAlbum.replace('{albumId}', albumId as string))
        .then((res: AxiosResponse<Album>) => res.data),
    {
      staleTime: DEFAULT_STALE_TIME,
      onError: () => {
        ToastService.showSuccess('toasts.error.hooks.useSingleAlbum');
      },
    }
  );
};
