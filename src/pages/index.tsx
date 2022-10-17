import { AlbumFilters } from '@components/AlbumFilters';
import { CommonLayout } from '@components/Layout';
import { Timeline } from '@components/Timeline/Timeline';
import TimelineSpinner from '@components/Timeline/TimelineSpinner';
import {
  ALBUM_QUERY_PAGE_SIZE,
  API_ROUTES,
  QUERY_KEYS,
  ROUTES
} from '@constants';
import { api } from '@services/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getLocalizedDate } from '@utils';
import { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Divider } from 'theme-ui';
import { Album, AlbumCollection, Type } from 'types/contentful';
import { useAlbums } from '../hooks/album.hooks';

const styles: SxStyleProp = {
  noResults: {
    display: 'flex',
    justifyContent: 'center',
  }
}

const INITIAL_ALBUM_TYPES = [Type.Album, Type.Ep, Type.Single];

const IndexPage: React.FC<NextPage> = () => {
  const t = useTranslations('pages.index');
  const [selectedTypes, setSelectedTypes] =
    useState<Type[]>(INITIAL_ALBUM_TYPES);
  const router = useRouter();
  const { ref, inView } = useInView();

  /**
   * A helper that returns a year of a given release date
   */
  const getReleaseYear = (album: Album): string =>
    getLocalizedDate(album.releasedAt, false, true);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } =
    useAlbums(selectedTypes);

  /**
   * Returns a memoized array of releases sorted by the release year
   */
  const releaseYears = useMemo(() => {
    const allAlbums = data?.pages.flatMap((page) => page.items);

    return allAlbums
      ?.map((album) => getReleaseYear(album))
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((year) => ({
        year,
        albums: allAlbums.filter((album) => getReleaseYear(album) === year),
      }));
  }, [data]);
  /**
   * Fetches a new page when "load more" button is in the viewport
   */
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  /**
   * Redirects user to a single album page upon a click
   */
  const onAlbumClick = (albumId: string) => {
    router.push(ROUTES.singleAlbum.replace('{albumId}', albumId));
  };

  /**
   * Fires upon format filter change
   */
  const onFilterChange = (types: Type[]) => {
    setSelectedTypes(types);
  };

  return (
    <CommonLayout title={t('title')}>
      <AlbumFilters types={selectedTypes} onChange={onFilterChange} mx='auto' />
      <Divider />
      {releaseYears?.map((obj) => {
        return (
          <Timeline
            year={obj.year}
            key={obj.year}
            albums={obj.albums}
            onItemClick={onAlbumClick}
          />
        );
      })}
      {/* Used when fetching the next page (infinite query) */}
      <TimelineSpinner
        containerRef={ref}
        isLoading={!!isFetchingNextPage || !!hasNextPage}
        text={isFetchingNextPage ? 'fetchingMore' : 'fetchMore'}
      />

      {/* Used when fetching filtered data */}
      <TimelineSpinner
        isLoading={isFetching && !isFetchingNextPage}
        text='fetching'
      />
      {!isFetching && !releaseYears?.length && (
        <Box sx={styles.noResults}>{t('noResults')}</Box>
      )}
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  const albumTypes = INITIAL_ALBUM_TYPES.join('|');

  // prefetch data on the server
  await queryClient.prefetchInfiniteQuery([QUERY_KEYS.albums, albumTypes], () =>
    api
      .get(API_ROUTES.albums, {
        params: { skip: 0, take: ALBUM_QUERY_PAGE_SIZE, albumTypes },
      })
      .then((res: AxiosResponse<AlbumCollection>) => res.data)
  );

  return {
    props: {
      // dehydrate query cache
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default IndexPage;
