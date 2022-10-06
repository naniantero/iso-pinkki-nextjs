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
    height: 64,
  },
};

export const TopBar: React.FC<Props> = () => {
  return (
    <Box className='layout__top-bar' sx={styles.container} px={3} as='header' py={3}>
      <Link href={ROUTES.index}>
        <a>
          <Image sx={styles.img} src='/pinkki_inverted.svg' alt='Iso pinkki' />
        </a>
      </Link>
    </Box>
  );
};
