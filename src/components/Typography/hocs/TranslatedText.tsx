import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from 'theme-ui';

interface Props {
  text: string;
  translateValues?: any;
}

export const TranslatedText: React.FC<Props> = ({ text, translateValues }) => {
  const t = useTranslations();

  return <Text>{t(text, translateValues)}</Text>;
};