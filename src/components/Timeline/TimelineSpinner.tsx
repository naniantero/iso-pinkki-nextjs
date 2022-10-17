import { useTranslations } from 'next-intl';
import React, { Ref } from 'react';
import { Box, Spinner, Text } from 'theme-ui';

interface Props {
  containerRef?: Ref<HTMLButtonElement>;
  isLoading: boolean;
  text: string;
}

const styles: SxStyleProp = {
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    minHeight: 80,
    justifyContent: 'center',
  },
};

const TimelineSpinner: React.FC<Props> = ({
  containerRef,
  isLoading,
  text,
}) => {
  const t = useTranslations('components.timelineSpinner');

  if (!isLoading) return null;

  return (
    <Box sx={styles.spinnerContainer} ref={containerRef}>
      <Spinner />
      <Text ml={2}>{t(text)}</Text>
    </Box>
  );
};

// #!%ck this error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.forwardRef(TimelineSpinner);
