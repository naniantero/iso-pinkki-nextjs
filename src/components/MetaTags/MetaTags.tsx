import React from 'react';
import { Box, BoxProps } from 'theme-ui';
import { useTranslations } from 'next-intl';
import { Album } from 'types/contentful';

interface Props extends BoxProps {
  album: Album;
  hideFormats?: boolean;
  hideType?: boolean;
}

const styles: SxStyleProp = {
  tag: {
    paddingLeft: 2,
    paddingRight: 2,
    py: 1,
    display: 'block',
    fontSize: 0,
    borderRadius: 4,
    color: 'white',
    fontWeight: 400,
    marginTop: 1,
    maxHeight: 32,
  },
  type: {
    backgroundColor: 'grey3',
  },
  format: {
    backgroundColor: 'grey6',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
};

export const MetaTags: React.FC<Props> = ({
  album,
  sx,
  children,
  hideFormats,
  hideType,
  ...rest
}) => {
  const ct = useTranslations('common');

  return (
    <Box sx={{ ...styles.container, ...sx }} {...rest}>
      {!hideType && album.type && (
        <Box as='span' sx={{ ...styles.tag, ...styles.type }}>
          {ct(`type.${album.type}`)}
        </Box>
      )}
      {!hideFormats &&
        album.formats.map((format) => (
          <Box as='span' sx={{ ...styles.tag, ...styles.format }} key={format}>
            {ct(`format.${format}`)}
          </Box>
        ))}
      {children}
    </Box>
  );
};
