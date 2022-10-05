import { CommonLayout } from '@components/Layout';
import { Date, Heading, Text } from '@components/Typography';
import { QUERY_KEYS } from '@constants';
import { api } from '@services/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSingleAlbum } from 'hooks';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';
import { API_ROUTES, ROUTES } from '../../constants/path.constants';
import { Box, Divider } from 'theme-ui';
import { MetaTags } from '@components/AlbumItem';
import { KeyValueList } from '@components/KeyValueList';
import { Image } from '@components/Image';
import Link from 'next/link';
import { Icon } from '@components/Icon';
import { StreamLinks } from '../../components/StreamLinks/StreamLinks';

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

  backLink: {
    display: 'flex',
    alignItems: 'center',
  },
};

const SingleAlbumPage: React.FC<NextPage> = (props) => {
  const router = useRouter();
  const { data } = useSingleAlbum(router.query.albumId as string);
  const t = useTranslations('pages.singleAlbum');

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
  console.log(data)

  return (
    <CommonLayout title={data?.title ?? '-'}>
      <Box sx={{ width: '100%' }}>
        <Text sx={styles.backLink} mb={3}>
          <Icon icon='arrow_back_ios' mr={2} />
          <Link href={ROUTES.index}>{t('returnToIndex')}</Link>
        </Text>
        <Divider />
        {data && (
          <Box mt={3}>
            <Box sx={styles.infoContainer}>
              <Box sx={styles.imageContainer}>
                <Image
                  src={data?.featuredImage.url}
                  alt={data?.title}
                  sx={styles.featuredImage}
                />
                <StreamLinks album={data} sx={styles.streamLinks} mt={2} />
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
    </CommonLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const {
    query: { albumId },
  } = context;

  // prefetch data on the server
  await queryClient.prefetchQuery([QUERY_KEYS.singleAlbum, albumId], () =>
    api
      .get(API_ROUTES.singleAlbum.replace('{albumId}', albumId as string))
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
