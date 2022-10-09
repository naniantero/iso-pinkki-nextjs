import React, { FC, useMemo, ReactNode } from 'react';
import { getLocalizedDate } from '@utils';
import { Text, TextProps } from 'theme-ui';

interface DateProps extends TextProps {
  date?: string | Date;
  children?: ReactNode;
  includeYear?: boolean;
}

const styles: SxStyleProp = {
  container: {
    '& .children:first-letter': {
      textTransform: 'capitalize',
    },
    display: 'flex',
    alignItems: 'center',
  },
};

export const Date: FC<DateProps> = ({
  includeYear,
  date,
  children,
  sx,
  ...rest
}) => {
  const prettifiedDate = useMemo(() => {
    return getLocalizedDate(date, includeYear);
  }, [date, includeYear]);

  return (
    <Text
      sx={{ ...styles.container, ...sx }}
      {...rest}
      suppressHydrationWarning
    >
      <span className='children'>{children}</span>
      {prettifiedDate}
    </Text>
  );
};
