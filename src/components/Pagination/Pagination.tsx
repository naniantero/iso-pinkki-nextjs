import React from 'react';
import { BoxProps, Box, Button } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import { useTranslations } from 'next-intl';
import { Text } from '@components/Typography';

interface Props extends BoxProps {
  prevId?: string;
  nextId?: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const styles: SxStyleProp = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export const Pagination: React.FC<Props> = ({
  prevId,
  nextId,
  onPrevClick,
  onNextClick,
  sx,
  ...rest
}) => {
  const t = useTranslations('components.pagination');

  return (
    <Box sx={{ ...styles.pagination, ...sx }} {...rest}>
      {prevId && (
        <Button variant='text' onClick={onPrevClick}>
          <Icon icon='chevron_left' />
          {t('previous')}
        </Button>
      )}
      {nextId && prevId && <Text sx={{ color: 'stroke' }}>|</Text>}
      {nextId && (
        <Button variant='text' onClick={onNextClick}>
          {t('next')}
          <Icon icon='chevron_right' />
        </Button>
      )}
    </Box>
  );
};
