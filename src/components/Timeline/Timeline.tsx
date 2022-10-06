import { AlbumItem } from '@components/AlbumItem';
import { BlankList } from '@components/BlankList';
import { Date, Heading } from '@components/Typography';
import React from 'react';
import { Box } from 'theme-ui';

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
    width: ['inherit', 64],
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
  },
  yearContent: {
    display: 'flex',
    justifyContent: ['center', 'flex-start'],
  },
  itemMeta: {
    display: ['none', 'flex'],
    borderBottom: '1px solid',
    borderColor: 'darkStroke',
    width: 100,
    justifyContent: 'center',
    fontSize: 0,
    height: 24,
    marginTop: -3,
  },
  yearHeading: {
    marginRight: [0, -3],
    borderBottom: ['1px solid', 'none'],
    borderColor: 'stroke',
    paddingBottom: [1, 0],
    display: 'block',
  },
  itemList: {
    width: '100%',
  },
};

export const Timeline: React.FC<Props> = ({ albums, year, onItemClick }) => {
  return (
    <Box sx={styles.yearContainer} className={`${year} year`} mb={3}>
      <Box
        sx={styles.yearContent}
        className='timeline__year-content'
        mb={[3, 0]}
      >
        <Box sx={styles.timelineContainer} className='timeline__container'>
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
