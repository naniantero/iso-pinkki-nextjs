import { SITE_NAME } from '@constants';
import Head from 'next/head';
import { FC, useMemo } from 'react';

interface Props {
  title: string;
}

export const HtmlHead: FC<Props> = ({ title }) => {
  const htmlTitle = useMemo(() => {
    return `${title} - ${SITE_NAME}`;
  }, [title]);

  return (
    <Head>
      <title>{htmlTitle}</title>
    </Head>
  );
};
