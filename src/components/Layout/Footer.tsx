import { Box, Link } from 'theme-ui';

interface Props {}

const styles = {
  container: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'primary',
    justifyContent: 'center',
    width: '100%',
  },
  link: {
    color: 'white',
  },
};
export const Footer: React.FC<Props> = () => {
  return (
    <Box className='layout__footer' as='footer' sx={styles.container} px={3}>
      <Link sx={styles.link} href='mailto:isopinkki@gmail.com'>
        isopinkki@gmail.com
      </Link>
    </Box>
  );
};
