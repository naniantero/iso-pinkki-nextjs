import { useTranslations } from 'next-intl';
import React from 'react';
import { Box, BoxProps, Button } from 'theme-ui';
import { Icon } from '@components/Icon';

interface Props extends BoxProps {
  prevId?: string;
  nextId?: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const styles: SxStyleProp = {
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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
      <Button variant='text' onClick={onPrevClick} disabled={!prevId}>
        <Icon icon='chevron_left' color="secondary" />
        {t('previous')}
      </Button>
      <Button variant='text' onClick={onNextClick} disabled={!nextId}>
        {t('next')}
        <Icon icon='chevron_right' color="secondary" />
      </Button>
    </Box>
  );
};
