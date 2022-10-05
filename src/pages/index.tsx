import { CommonLayout } from '@components/Layout';
import { Timeline } from '@components/Timeline/Timeline';
import { Text } from '@components/Typography';
import { QUERY_KEYS } from '@constants';
import { api } from '@services/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Spinner } from 'theme-ui';
import { ALBUM_QUERY_PAGE_SIZE, API_ROUTES } from '@constants';
import { useAlbums } from '../hooks/album.hooks';
import { useRouter } from 'next/router';
import { ROUTES } from '../constants/path.constants';

const styles: SxStyleProp = {
  loadMoreButton: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    minHeight: 80,
    backgroundColor: 'transparent',
    color: 'text',
  },
};

const IndexPage: React.FC<NextPage> = () => {
  const t = useTranslations('pages.index');
  const router = useRouter();
  const { ref, inView } = useInView();

  /**
   * Returns a year of a given release date
   */
  const getReleaseYear = (album: Album): string =>
    DateTime.fromISO(album.releasedAt).toFormat('yyyy');

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useAlbums();

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

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const onAlbumClick = (albumId: string) => {
    router.push(ROUTES.singleAlbum.replace('{albumId}', albumId));
  };

  return (
    <CommonLayout title={t('title')}>
      {releaseYears?.map((obj) => {
        return (
          <Timeline
            year={obj.year}
            key={obj.year}
            albums={obj.albums}
            onItemClick={onAlbumClick}
          ></Timeline>
        );
      })}

      {releaseYears?.length && hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          ref={ref}
          sx={styles.loadMoreButton}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && <Spinner />}
          <Text ml={2}>
            {isFetchingNextPage ? t('fetchingMore') : t('loadMore')}
          </Text>
        </Button>
      )}
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  // prefetch data on the server
  await queryClient.prefetchInfiniteQuery([QUERY_KEYS.albums], () =>
    api
      .get(API_ROUTES.albums, {
        params: { skip: 0, take: ALBUM_QUERY_PAGE_SIZE },
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
