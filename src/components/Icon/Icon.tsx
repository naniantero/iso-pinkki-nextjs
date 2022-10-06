import React, { FC, useMemo } from 'react';
import { Text, TextProps } from 'theme-ui';

type IconType =
  | 'arrow_right_alt'
  | 'chevron_left'
  | 'chevron_right'
  | 'spotify'
  | 'arrow_back_ios';

const narrowIcons = [
  'arrow_back_ios',
] as IconType[];

export interface IconProps extends TextProps {
  type?: 'outlined';
  icon: IconType;
  color?: 'primary' | 'secondary' | 'white';
}
export const Icon: FC<IconProps> = ({ icon, type, color, sx, ...rest }) => {
  const className = type ? `material-icons-${type}` : 'material-icons';
  const styles = useMemo(() => {
    const obj = {
      color: color || 'primary',
      fontSize: 24,
      minWidth: 24,
      ...sx,
    } as SxStyleProp;

    if (narrowIcons.includes(icon)) {
      obj.minWidth = 0;
      obj.width = 12;
    }

    return obj;
  }, [icon, color, sx]);

  return (
    <Text
      role='presentation'
      as='span'
      sx={styles}
      className={`pinkki-icon ${className}`}
      {...rest}
    >
      <span aria-hidden='true'>{icon}</span>
    </Text>
  );
};
