import { Text } from '@components/Typography';
import { useTranslations } from 'next-intl';

interface Props {
  text: string;
  translateValues?: any;
}

export const TranslatedText: React.FC<Props> = ({ text, translateValues }) => {
  const t = useTranslations();

  return <Text>{t(text, translateValues)}</Text>;
};