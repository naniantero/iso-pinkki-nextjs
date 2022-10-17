import { Icon } from '@components/Icon';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Box, BoxProps, Button } from 'theme-ui';
import { Type } from 'types/contentful';

interface Props extends Omit<BoxProps, 'onChange'> {
  types: Type[];
  onChange: (types: Type[]) => void;
}

const styles: SxStyleProp = {
  button: {
    border: '2px solid',
    borderColor: 'primary',
    borderRadius: 30,
    transition: 'all 0.25s ease-in',
    height: 40,
  },
  inactive: {
    backgroundColor: 'transparent',
    color: 'primary',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    fontSize: [24, 24],
  },
};
export const AlbumFilters: React.FC<Props> = ({ types, onChange, ...rest }) => {
  const t = useTranslations('components.albumFilters');

  /**
   * Forms new filter array on button click and fires the onChange callback
   */
  const onButtonClick = (type: Type) => () => {
    let newTypes = [...types];

    if (types.includes(type)) {
      newTypes = newTypes.filter((f) => f !== type);
    } else {
      newTypes.push(type);
    }

    onChange(newTypes);
  };

  return (
    <Box sx={styles.container} {...rest}>
      {Object.values(Type).map((type) => {
        const isActive = types.includes(type);
        return (
          <Button
            onClick={onButtonClick(type)}
            py={0}
            px={2}
            sx={
              isActive
                ? styles.button
                : { ...styles.button, ...styles.inactive }
            }
            key={type}
          >
            <Icon
              icon={isActive ? 'visibility' : 'visibility_off'}
              color={isActive ? 'white' : 'primary'}
              sx={styles.icon}
              mr='8px'
            />
            {t(`type.${type}`)}
          </Button>
        );
      })}
    </Box>
  );
};
