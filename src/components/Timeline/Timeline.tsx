import { Box, Button } from 'theme-ui';
import React, { ReactNode } from 'react';
import { Heading } from '../Typography/Heading';
import { BlankList } from '../BlankList/BlankList';
import { AlbumItem } from '../AlbumItem/AlbumItem';
import { Date } from '@components/Typography';

interface Props {
  onItemClick: (itemId: string) => void;
  albums: Album[];
  year: string;
}

const styles: SxStyleProp = {
  yearContainer: {
    display: 'flex',
    flexDirection: ['column', 'row'],
  },
  timeline: {
    width: '1px',
    backgroundColor: 'darkStroke',
    height: '100%',
    display: ['none', 'block'],
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 64,
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
  },
  yearContent: {
    display: 'flex',
  },
  itemMeta: {
    display: ['none', 'flex'],
    borderBottom: '1px solid',
    borderColor: 'darkStroke',
    width: 100,
    justifyContent: 'center',
    fontSize: 0,
    height: 24,
    marginTop: -24,
  },
  yearHeading: {
    marginRight: -32,
  },
  itemList: {
    width: '100%',
  },
};
export const Timeline: React.FC<Props> = ({ albums, year, onItemClick }) => {
  return (
    <Box sx={styles.yearContainer} className={`${year} year`} mb={3}>
      <Box sx={styles.yearContent}>
        <Box sx={styles.timelineContainer}>
          <Heading as='h2' sx={styles.yearHeading}>
            {year}
          </Heading>
          <Box mt={3} sx={styles.timeline} />
        </Box>
      </Box>
      <BlankList py={3} sx={styles.itemList}>
        {albums.map((album) => (
          <Box as='li' key={album.id} sx={styles.timelineItem}>
            <Box sx={styles.itemMeta}>
              <Date date={album.releasedAt} />
            </Box>
            <AlbumItem album={album} onClick={onItemClick} mb={3} />
          </Box>
        ))}
      </BlankList>
    </Box>
  );
};
