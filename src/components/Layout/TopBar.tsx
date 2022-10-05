import { ROUTES } from '@constants';
import Link from 'next/link';
import { Box, Image } from 'theme-ui';

interface Props {}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'primary',
    width: '100%',
  },
  img: {
    height: 80,
  },
};

export const TopBar: React.FC<Props> = () => {
  return (
    <Box className='top-bar' sx={styles.container} px={3} as='header' py={3}>
      <Link href={ROUTES.index}>
        <Image sx={styles.img} src='/pinkki_inverted.svg' alt='Iso pinkki' />
      </Link>
    </Box>
  );
};
