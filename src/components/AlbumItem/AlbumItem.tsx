import { Heading, Text } from '@components/Typography';
import { Box, BoxProps, Button, Image } from 'theme-ui';
import { MetaTags } from './MetaTags';

interface Props extends Omit<BoxProps, 'onClick'> {
  album: Album;
  onClick: (albumId: string) => void;
}

const styles: SxStyleProp = {
  albumContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    borderRadius: 4,
    '&:not(:hover) .featured-image': {
      filter: 'none',
      WebkitFilter: 'grayscale(100%)',
      MozFilter: 'grayscale(100%)',
      'msFilter ': 'grayscale(100%)',
      OFilter: 'grayscale(100%)',
    },
  },
  featuredImage: {
    marginRight: 3,
    borderRadius: 4,
    minHeight: 64,
    minWidth: 64,
    maxHeight: 64,
    maxWidth: 64,
    transition: 'all 0.25s ease-in',
  },
  overlayButton: {
    cursor: 'pointer',
    background: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  albumContent: {
    display: 'flex',
    alignItems: ['flex-start', 'center'],
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: ['column', 'row'],
  },
  albumTextContent: {
    flex: '1 1 100%',
  },
  metaTags: {
    display: ['none', 'flex'],
    minWidth: 200,
    justifyContent: 'flex-end',
  },
};

export const AlbumItem: React.FC<Props> = ({ album, onClick, ...rest }) => {
  const onItemClick = () => {
    onClick(album.id);
  };

  return (
    <Box className='album' key={album.id} sx={styles.albumContainer} {...rest}>
      <Button onClick={onItemClick} sx={styles.overlayButton} />
      {album.featuredImage && (
        <Image
          className='featured-image'
          sx={styles.featuredImage}
          src={album.featuredImage.url}
          alt={album.title}
        />
      )}
      <Box sx={styles.albumContent}>
        <Box sx={styles.albumTextContent}>
          <Heading as='h3'>{album.title}</Heading>
          <Text>{album.artist.name}</Text>
        </Box>
        <MetaTags album={album} sx={styles.metaTags} />
      </Box>
    </Box>
  );
};
