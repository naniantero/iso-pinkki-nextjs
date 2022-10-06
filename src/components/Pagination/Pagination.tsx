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
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '1px',
    height: 36,
    backgroundColor: 'stroke',
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
        {t('previous')}
      </Button>
      <Box sx={styles.separator} />
      <Button variant='text' onClick={onNextClick} disabled={!nextId}>
        {t('next')}
      </Button>
    </Box>
  );
};
