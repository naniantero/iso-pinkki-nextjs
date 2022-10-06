import React, { ReactNode, useMemo } from 'react';
import Modal from 'react-modal';
import { APP_ID } from '@constants';
import { Box } from 'theme-ui';
import { Heading } from '@components/Typography';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
}

export const CommonModal: React.FC<Props> = ({ isOpen, children, title }) => {
  const styles: SxStyleProp = useMemo(
    () => ({
      // content / overlay used by react-modal
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'white',
        border: 0,
        overflow: 'hidden',
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 10,
      },
      innerContent: {},
    }),
    []
  );

  Modal.setAppElement(`#${APP_ID}`);

  return (
    <Modal isOpen={isOpen} style={styles}>
      <Box sx={styles.innerContent} p={3}>
        {title && (
          <Box mb={2} as='header'>
            <Heading as='h1'>{title}</Heading>
          </Box>
        )}
        {children}
      </Box>
    </Modal>
  );
};
