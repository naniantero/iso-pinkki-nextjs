import React, { FC } from 'react';
import { Box, BoxProps, Grid } from 'theme-ui';

interface Props extends BoxProps {
  items: { key: string; value?: any }[];
}

const styles: SxStyleProp = {
  dl: {},
  dt: {
    display: 'flex',
    fontWeight: 300,
    float: 'left',
    fontSize: 1,
  },
  dd: {
    display: 'flex',
    fontSize: 1,
  },
};
export const KeyValueList: FC<Props> = ({ items, ...rest }) => {
  return (
    <Box as='dl' sx={styles.dl} {...rest}>
      {items.map((item) => {
        if (item.value) {
          return (
            <Grid key={item.key} columns={2} sx={styles.grid}>
              <Box as='dt' mr={3} sx={styles.dt}>
                {item.key}
              </Box>
              <Box as='dd' sx={styles.dd}>
                {item.value}
              </Box>
            </Grid>
          );
        }
        return null;
      })}
    </Box>
  );
};
