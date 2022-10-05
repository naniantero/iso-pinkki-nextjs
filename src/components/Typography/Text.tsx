import { useMemo } from 'react';
import { Text as ThemeText, TextProps } from 'theme-ui';

export interface Props extends TextProps {
  color?: 'primary' | 'grey6' | 'white';
}

// HOC  using Theme UI Text
export const Text: React.FC<Props> = ({ children, color, sx, ...rest }) => {
  const resolvedStyles = useMemo(() => {
    return {
      color: color ?? 'inherit',
      ...sx,
    };
  }, [sx, color]);

  return (
    <ThemeText {...rest} sx={resolvedStyles}>
      {children}
    </ThemeText>
  );
};
