import {
  ALBUM_QUERY_PAGE_SIZE,
  API_ROUTES,
  DEFAULT_STALE_TIME,
  QUERY_KEYS
} from '@constants';
import { api } from '@services/api';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Album, AlbumCollection, Type } from 'types/contentful';
import { AlbumMetaData } from 'types/spotify';
import ToastService from '../services/toast.service';

/**
 * Hooks are used to display prefetched data in our page, without passing any data by props.
 */

/**
 * Fetches all albums using infinite query
 */
export const useAlbums = (
  albumTypes: Type[]
): UseInfiniteQueryResult<AlbumCollection> => {
  // Joins album types array which will then be used in query key array
  const albumTypesStr = albumTypes.join('|');

  return useInfiniteQuery(
    [QUERY_KEYS.albums, albumTypesStr],
    async ({ pageParam = 0 }) => {
      const res = (
        await api.get(API_ROUTES.albums, {
          params: {
            take: ALBUM_QUERY_PAGE_SIZE,
            skip: pageParam * ALBUM_QUERY_PAGE_SIZE,
            albumTypes: albumTypesStr,
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
        ToastService.showError('toasts.error.hooks.useAlbums');
      },
      staleTime: DEFAULT_STALE_TIME,
    }
  );
};

/**
 * Makes a single album query using an albumId
 */
export const useSingleAlbum = (
  albumId: string
): UseQueryResult<Album & AlbumMetaData> => {
  return useQuery(
    [QUERY_KEYS.singleAlbum, albumId],
    () =>
      api
        .get(API_ROUTES.singleAlbum.replace('{albumId}', albumId as string))
        .then((res: AxiosResponse<Album & AlbumMetaData>) => res.data),
    {
      staleTime: DEFAULT_STALE_TIME,
      onError: () => {
        ToastService.showError('toasts.error.hooks.useSingleAlbum');
      },
    }
  );
};

/**
 * Makes a "all album IDs" query
 */
export const useAlbumIds = (): UseQueryResult<string[]> => {
  return useQuery(
    [QUERY_KEYS.albumIds],
    () =>
      api
        .get(API_ROUTES.albumIds)
        .then((res: AxiosResponse<Album>) => res.data),
    {
      staleTime: DEFAULT_STALE_TIME,
    }
  );
};
