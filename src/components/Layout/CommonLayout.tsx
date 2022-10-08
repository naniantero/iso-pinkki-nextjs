import { ReactNode } from 'react';
import { Box } from 'theme-ui';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { HtmlHead } from '@components/HtmlHead/HtmlHead';
import { APP_ID } from '@constants';

interface Props {
  children: ReactNode;
  title: string;
}

const styles: SxStyleProp = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  main: {
    maxWidth: 1024,
    flex: '1 1 100%',
    width: '100%',
  },
};

export const CommonLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <HtmlHead title={title} />
      <Box sx={styles.wrapper} className='layout__wrapper' id={APP_ID}>
        <TopBar />
        <Box as='main' sx={styles.main} py={3} px={[2, 3]}>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};
