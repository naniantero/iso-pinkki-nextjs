import { Box, Image, Link, BoxProps } from 'theme-ui';
interface Props extends BoxProps {
  album: Album;
}

interface StreamLinkProps {
  icon: 'tidal' | 'spotify' | 'bandcamp';
  href: string;
}

const styles: SxStyleProp = {
  wrapper: {
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: 1,
    },
  },
  iconContainer: {
    '> a': {
      lineHeight: 1,
      marginTop: '2px',
    },
    width: 48,
    height: 48,
    borderRadius: 64,
    backgroundColor: 'text',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    maxWidth: 36,
    maxHeight: 36,
  },
};

const StreamLink: React.FC<StreamLinkProps> = ({ icon, href }) => {
  return (
    <Box sx={styles.iconContainer}>
      <Link href={href} target='_blank'>
        <Image sx={styles.icon} src={`/${icon}.svg`} alt={icon} />
      </Link>
    </Box>
  );
};
export const StreamLinks: React.FC<Props> = ({ album, sx, ...rest }) => {
  if (!album.spotify && !album.bandcamp && !album.tidal) return null;

  return (
    <Box sx={{ ...styles.wrapper, ...sx }} {...rest}>
      {album.spotify && <StreamLink icon='spotify' href={album.spotify} />}
      {album.tidal && <StreamLink icon='tidal' href={album.tidal} />}
      {album.bandcamp && <StreamLink icon='bandcamp' href={album.bandcamp} />}
    </Box>
  );
};
