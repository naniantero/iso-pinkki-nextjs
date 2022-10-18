import { Icon, IconProps } from '@components/Icon';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-audio-player';
import { Box, BoxProps, IconButton, IconButtonProps } from 'theme-ui';
import { TrackProgress } from './TrackProgress';
import { Album } from '../../types/contentful';
import { AlbumMetaData } from '../../types/spotify';

dayjs.extend(duration);
interface Props extends BoxProps {
  album: Album & AlbumMetaData;
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
  trackName: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  playIcon: commonIconButtonStyles,
  stopIcon: {
    ...commonIconButtonStyles,
    backgroundColor: 'secondary',
    fontSize: 32,
    minWidth: 40,
    height: 40,
    borderRadius: 40,
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
  currentlyPlaying: {
    padding: 2,
    border: '1px solid',
    borderColor: 'grey9',
    marginTop: 2,
    marginBottom: 2,
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
  const [previewTrack, setPreviewTrack] = useState<string | undefined>();
  const [secondsListened, setSecondsListened] = useState<number | undefined>();

  /**
   * Set preview track to null on unmount
   */
  useEffect(() => {
    return () => {
      setPreviewTrack(undefined);
    };
  }, [album]);

  /**
   * Returns a length of the song in a proper format
   */
  const getLength = (milliseconds: number) => {
    return dayjs.duration(milliseconds).format('mm:ss');
  };

  /**
   * Sets clicked track as a preview track and AudioPlayer
   * starts playing it automatically. Undefined stops the play
   */
  const onPlaybackButtonClick = (track?: SpotifyApi.TrackObjectFull) => () => {
    setPreviewTrack(track?.preview_url ?? undefined);
  };

  /**
   * Called every listenInterval milliseconds during playback.
   */
  const onTrackListen = (seconds: number) => {
    setSecondsListened(seconds);
  };

  const handlePlayEnd = () => {
    setSecondsListened(undefined);
    setPreviewTrack(undefined);
  };

  return (
    <Box {...rest}>
      {previewTrack && (
        <AudioPlayer
          src={previewTrack}
          autoPlay
          onListen={onTrackListen}
          listenInterval={1000}
          onAbort={handlePlayEnd}
          onEnded={handlePlayEnd}
          onError={handlePlayEnd}
        />
      )}

      <Box as='table' sx={styles.table}>
        <tbody>
          {album.spotify?.tracks?.tracks.map((item) => {
            const isCurrentlyPlaying = previewTrack === item.preview_url;

            return (
              <React.Fragment key={item.name}>
                <Box
                  as='tr'
                  sx={
                    isCurrentlyPlaying
                      ? { ...styles.tr, ...styles.currentlyPlaying }
                      : styles.tr
                  }
                >
                  <Box as='td' sx={{ ...styles.td, maxWidth: 32 }}>
                    {!isCurrentlyPlaying && (
                      <PlaybackButton
                        onClick={onPlaybackButtonClick(item)}
                        icon='play_arrow'
                      />
                    )}
                    {isCurrentlyPlaying && (
                      <PlaybackButton
                        onClick={onPlaybackButtonClick()}
                        icon='stop'
                        iconColor='white'
                        sx={styles.stopIcon}
                      />
                    )}
                  </Box>
                  <Box
                    as='td'
                    sx={{ ...styles.td, ...styles.trackName }}
                    px={isCurrentlyPlaying ? 3 : 2}
                  >
                    <span>{item.name}</span>
                    {isCurrentlyPlaying && (
                      <TrackProgress position={secondsListened} mt='8px' />
                    )}
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
            );
          })}
        </tbody>
      </Box>
    </Box>
  );
};
