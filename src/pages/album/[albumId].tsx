import { MetaTags } from '@components/AlbumItem';
import { Image } from '@components/Image';
import { KeyValueList } from '@components/KeyValueList';
import { CommonLayout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { StreamLinks } from '@components/StreamLinks';
import { Date, Heading, Text } from '@components/Typography';
import { API_ROUTES, QUERY_KEYS, ROUTES } from '@constants';
import { api } from '@services/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSingleAlbum } from 'hooks';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Box } from 'theme-ui';
import { useAlbumIds } from '../../hooks/album.hooks';

const styles: SxStyleProp = {
  infoContainer: {
    display: 'flex',
    flexDirection: ['column', 'row'],
  },
  featuredImage: {
    maxWidth: '100%',
    flex: 1,
    marginBottom: [3, 0],
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    maxWidth: ['none', 400],
    marginRight: [0, 3],
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  desktopPagination: {
    display: ['none', 'flex'],
    marginTop: 5,
  },
  mobilePagination: {
    display: ['flex', 'none'],
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  streamLinks: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
};

const SingleAlbumPage: React.FC<NextPage> = () => {
  const router = useRouter();
  const { data } = useSingleAlbum(router.query.albumId as string);
  const { data: albumIds } = useAlbumIds();
  const t = useTranslations('pages.singleAlbum');

  /**
   * Returns an adjacent album ids object based on current albumId
   */
  const adjacentIds = useMemo(() => {
    if (!router.query.albumId || !albumIds?.length) return;
    const currentAlbumIndex = albumIds?.findIndex(
      (id) => id === router.query.albumId
    );

    return {
      nextId: albumIds[currentAlbumIndex + 1],
      prevId: albumIds[currentAlbumIndex - 1],
    };
  }, [albumIds, router.query.albumId]);

  /**
   * Album meta data displayed via KeyValueList
   */
  const keyValueListItems = [
    {
      key: t('ean'),
      value: data?.ean,
    },
    {
      key: t('catalogId'),
      value: data?.ids?.join(', '),
    },
    {
      key: t('releaseDate'),
      value: <Date includeYear date={data?.releasedAt} />,
    },
  ];

  /**
   * Redirects to an adjacent page when user clicks "next"
   */
  const onNextClick = () => {
    if (!adjacentIds?.nextId) return;
    router.push(ROUTES.singleAlbum.replace('{albumId}', adjacentIds?.nextId));
  };

  /**
   * Redirects to an adjacent page when user clicks "prev"
   */
  const onPrevClick = () => {
    if (!adjacentIds?.prevId) return;
    router.push(ROUTES.singleAlbum.replace('{albumId}', adjacentIds?.prevId));
  };

  /**
   * Renders a pagination block with alternating styles depending on isMobile param
   */
  const renderPagination = (isMobile?: boolean) => (
    <Box sx={styles.paginationContainer}>
      <Pagination
        sx={isMobile ? styles.mobilePagination : styles.desktopPagination}
        nextId={adjacentIds?.nextId}
        prevId={adjacentIds?.prevId}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
      />
    </Box>
  );

  return (
    <CommonLayout title={data?.title ?? '-'}>
      {renderPagination(true)}
      <Box sx={{ width: '100%' }}>
        {data && (
          <Box mt={3}>
            <Box sx={styles.infoContainer}>
              <Box sx={styles.imageContainer}>
                <Image
                  src={data?.featuredImage.url}
                  alt={data?.title}
                  sx={styles.featuredImage}
                />
                <StreamLinks album={data} mt={3} sx={styles.streamLinks} />
              </Box>

              <Box>
                <Heading as='h1'>{data?.title}</Heading>
                <Text mb={3}>{data?.artist.name}</Text>
                <MetaTags album={data} my={3} />
                <KeyValueList items={keyValueListItems} />
                {data.description && (
                  <Box dangerouslySetInnerHTML={{ __html: data.description }} />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {renderPagination()}
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const {
    query: { albumId },
  } = context;

  /**
   * Prefetch the album data on the server side
   */
  await queryClient.prefetchQuery([QUERY_KEYS.singleAlbum, albumId], () =>
    api
      .get(API_ROUTES.singleAlbum.replace('{albumId}', albumId as string))
      .then((res: AxiosResponse<AlbumCollection>) => res.data)
  );

  /**
   * Fethches all the album ids. Needed to display the prev/next album pagination
   */
  await queryClient.prefetchQuery([QUERY_KEYS.albumIds], () =>
    api
      .get(API_ROUTES.albumIds)
      .then((res: AxiosResponse<AlbumCollection>) => res.data)
  );

  return {
    props: {
      // dehydrate query cache
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default SingleAlbumPage;
