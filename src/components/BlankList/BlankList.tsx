import React, { Children, FC, ReactNode } from 'react';
import { Box, BoxProps, Spinner } from 'theme-ui';

interface BlankListProps extends BoxProps {
  horizontal?: boolean;
  isLoading?: boolean;
  noItemsText?: string | ReactNode;
  itemCount?: number;
}

export const BlankList: FC<BlankListProps> = ({
  horizontal,
  children,
  sx,
  mt,
  mb,
  ml,
  mr,
  isLoading,
  noItemsText,
  ...rest
}) => {
  const itemCount = Children.toArray(children).length;
  const styles: SxStyleProp = {
    list: {
      listStyleType: 'none',
      marginTop: mt ?? 0,
      marginBottom: mb ?? 0,
      marginLeft: ml ?? 0,
      marginRight: mr ?? 0,
      padding: 0,
    },
    loadingContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  if (horizontal) {
    styles.list.display = 'flex';
  }
  return (
    <Box
      sx={{ ...styles.list, ...sx }}
      as='ul'
      className='blank-pinkki-list'
      {...rest}
    >
      {isLoading && (
        <Box sx={styles.loadingContainer}>
          <Spinner />
        </Box>
      )}
      {!isLoading && children}
      {!isLoading && !itemCount && noItemsText}
    </Box>
  );
};
