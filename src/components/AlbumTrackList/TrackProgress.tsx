import React, { useMemo } from 'react';
import { Box, BoxProps } from 'theme-ui';

interface Props extends BoxProps {
  position?: number;
}

const styles: SxStyleProp = {
  progressBarContainer: {
    height:12,
    backgroundColor: 'grey9',
    width: '100%',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  progressBar: {
    backgroundColor: 'secondary',
    height: 6,
    borderRadius: 4,
  },
};

const PREVIEW_LENGTH = 30;

export const TrackProgress: React.FC<Props> = ({ position, ...rest }) => {
  const percentage = useMemo(() => {
    if (!position) return 0;
    return (position / PREVIEW_LENGTH) * 100;
  }, [position]);

  return (
    <Box sx={styles.progressBarContainer} {...rest}>
      <Box sx={styles.progressBar} style={{ width: `${percentage}%` }} />
    </Box>
  );
};
