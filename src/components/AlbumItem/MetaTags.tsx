import { Box, BoxProps } from 'theme-ui';
import { useTranslations } from 'next-intl';

interface Props extends BoxProps {
  album: Album;
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

export const MetaTags: React.FC<Props> = ({ album, sx, children, ...rest }) => {
  const ct = useTranslations('common');

  return (
    <Box sx={{ ...styles.container, ...sx }} {...rest}>
      {album.type && (
        <Box as='span' sx={{ ...styles.tag, ...styles.type }}>
          {ct(`type.${album.type}`)}
        </Box>
      )}
      {album.formats.map((format) => (
        <Box as='span' sx={{ ...styles.tag, ...styles.format }} key={format}>
          {ct(`format.${format}`)}
        </Box>
      ))}
      {children}
    </Box>
  );
};
