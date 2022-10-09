import { Icon } from '@components/Icon';
import { Duration } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Box, BoxProps, IconButton, IconButtonProps } from 'theme-ui';
import AudioPlayer from 'react-audio-player';
import { IconProps } from '@components/Icon';

interface Props extends BoxProps {
  album: Contentful.AlbumWithSpotify;
}

interface PlaybackButtonProps extends IconButtonProps {
  onClick: any;
  icon: IconProps['icon'];
  iconColor?: IconProps['color'];
}

const commonIconButtonStyles = {
  cursor: 'pointer',
  width: 24,
  height: 24,
  borderRadius: 16,
  fontSize: '12px',
};

const styles: SxStyleProp = {
  table: {
    width: '100%',
  },
  playIcon: commonIconButtonStyles,
  stopIcon: {
    ...commonIconButtonStyles,
    backgroundColor: 'secondary',
  },
  tr: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '4px',
    paddingBottom: '4px',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: 'grey10',
      transition: 'background-color 0.25s ease-in',
    },
  },
  td: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
};

/**
 * Renders the play button on AlbumTrackList
 */
const PlaybackButton: React.FC<PlaybackButtonProps> = ({
  onClick,
  icon,
  iconColor,
  ...rest
}) => {
  return (
    <IconButton onClick={onClick} sx={styles.playIcon} {...rest}>
      <Icon icon={icon} color={iconColor ?? 'secondary'} />
    </IconButton>
  );
};

export const AlbumTrackList: React.FC<Props> = ({ album, ...rest }) => {
  /**
   * Set preview track to null on unmount
   */
  useEffect(() => {
    return () => {
      setPreviewTrack(null);
    };
  }, [album]);

  const [previewTrack, setPreviewTrack] = useState<string | null>(null);

  const getLength = (duration: number) => {
    return Duration.fromMillis(duration).toFormat('mm:ss');
  };

  /**
   * Sets clicked track as a preview track and AudioPlayer
   * starts playing it automatically. Undefined stops the play
   */
  const onPlaybackButtonClick = (track?: SpotifyApi.TrackObjectFull) => () => {
    setPreviewTrack(track?.preview_url ?? null);
  };

  return (
    <Box {...rest}>
      {previewTrack && <AudioPlayer src={previewTrack} autoPlay />}

      <Box as='table' sx={styles.table}>
        <tbody>
          {album.spotify?.tracks?.tracks.map((item) => (
            <React.Fragment key={item.name}>
              <Box as='tr' sx={styles.tr}>
                <Box as='td' sx={{ ...styles.td, maxWidth: 32 }}>
                  {previewTrack !== item.preview_url && (
                    <PlaybackButton
                      onClick={onPlaybackButtonClick(item)}
                      icon='play_arrow'
                    />
                  )}
                  {previewTrack === item.preview_url && (
                    <PlaybackButton
                      onClick={onPlaybackButtonClick()}
                      icon='stop'
                      iconColor='white'
                      sx={styles.stopIcon}
                    />
                  )}
                </Box>
                <Box as='td' sx={styles.td}>
                  {item.name}
                </Box>
                <Box
                  as='td'
                  sx={{ ...styles.td, maxWidth: 64 }}
                  suppressHydrationWarning
                >
                  {getLength(item.duration_ms)}
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </tbody>
      </Box>
    </Box>
  );
};
