import React, { FC, useMemo, useState } from 'react';
import {
  Image as ThemeImage,
  Box,
  ImageProps as ThemeImageProps,
  Spinner,
} from 'theme-ui';
import { IconProps, Icon } from '../Icon/Icon';

interface ImageProps extends ThemeImageProps {
  placeholderIcon?: IconProps['icon'];
  src?: string;
  alt: string;
  size?: number | number[];
  imgSx?: any;
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  img: {},
};

export const Image: FC<ImageProps> = ({
  src,
  placeholderIcon,
  alt,
  height,
  imgSx,
  size,
  sx,
}) => {
  const [loaded, setLoaded] = useState(!src);

  const onImageLoaded = () => {
    console.log('LOADED')
    setLoaded(true);
  };

  const resolvedImage = useMemo(() => {
    if (src)
      return (
        <ThemeImage
          className='pinkki-image'
          height={height}
          src={src}
          alt={alt}
          onLoad={onImageLoaded}
          sx={imgSx}
        />
      );
    if (placeholderIcon) return <Icon icon={placeholderIcon} />;
    return undefined;
  }, [alt, src, placeholderIcon, height, imgSx]);

  const resolvedStyles = useMemo(() => {
    const extendedStyles = { ...styles.container, ...sx } as any;
    if (size) {
      extendedStyles.minWidth = size;
      extendedStyles.minHeight = size;
      extendedStyles.maxWidth = size;
      extendedStyles.maxHeight = size;
    }

    return extendedStyles;
  }, [size, sx]);
  return (
    <Box sx={resolvedStyles} className='pinkki-image-container'>
      {!loaded && <Spinner sx={{ position: 'absolute' }} />}
      {resolvedImage}
    </Box>
  );
};
