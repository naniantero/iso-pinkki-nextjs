import { FC, useMemo, useState } from 'react';
import {
  Box, Image as ThemeImage, ImageProps as ThemeImageProps,
  Spinner
} from 'theme-ui';

interface ImageProps extends ThemeImageProps {
  src?: string;
  alt: string;
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

export const Image: FC<ImageProps> = ({ src, alt, imgSx, sx }) => {
  const [loaded, setLoaded] = useState(!src);

  /**
   * TODO: check out what's wrong with this
   */
  const onImageLoaded = () => {
    setLoaded(true);
  };

  const resolvedImage = useMemo(() => {
    if (src)
      return (
        <ThemeImage
          className='pinkki-image'
          src={src}
          alt={alt}
          onLoad={onImageLoaded}
          sx={imgSx}
        />
      );
    return undefined;
  }, [alt, src, imgSx]);

  const resolvedStyles = useMemo(() => {
    return { ...styles.container, ...sx } as any;
  }, [sx]);

  return (
    <Box sx={resolvedStyles} className='pinkki-image-container'>
      {!loaded && <Spinner sx={{ position: 'absolute' }} />}
      {resolvedImage}
    </Box>
  );
};
