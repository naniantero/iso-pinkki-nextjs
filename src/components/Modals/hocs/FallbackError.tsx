import { CommonModal } from '../CommonModal';
import { useTranslations } from 'next-intl';
import { Text } from 'theme-ui';

export const FallbackError = () => {
  const t = useTranslations('components.fallbackError');
  return (
    <CommonModal isOpen title={t('title')}>
      <Text>{t('body')}</Text>
    </CommonModal>
  );
};
