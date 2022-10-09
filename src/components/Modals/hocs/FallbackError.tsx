import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from 'theme-ui';
import { CommonModal } from '../CommonModal';

export const FallbackError = () => {
  const t = useTranslations('components.fallbackError');
  return (
    <CommonModal isOpen title={t('title')}>
      <Text>{t('body')}</Text>
    </CommonModal>
  );
};
