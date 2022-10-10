import SpotifyWebApi from 'spotify-web-api-node';
import { DateTime } from 'luxon';
import { log } from 'next-axiom';

let accessToken: string | null = null;
let expiresAt: number | null = null;

const logger = log.with({ scope: 'spotify' });

class SpotifyModel {
  client: SpotifyWebApi;

  constructor() {
    this.client = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  }

  /**
   * Initializes the service, fetches the access token
   */
  async init() {
    const now = DateTime.local().toUnixInteger();
    const tokenExpired = expiresAt && expiresAt <= now;

    if (
      accessToken &&
      this.client.getAccessToken() === accessToken &&
      !tokenExpired
    ) {
      return;
    }

    if (accessToken && !tokenExpired) {
      logger.info(
        "We've stored an access token, but doesn't match the accessToken. Updating.."
      );
      this.client.setAccessToken(accessToken as string);
      return;
    }

    try {
      if (tokenExpired) {
        logger.info('Token has expired');
      } else {
        logger.info("We haven't stored an access token");
      }
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        body: { access_token, expires_in },
      } = await this.client.clientCredentialsGrant();

      this.client.setAccessToken(access_token);

      /**
       * Save for further use
       */
      accessToken = access_token;
      expiresAt = DateTime.local()
        .plus({ seconds: expires_in })
        .toUnixInteger();

      logger.info('Spotify: Access token expires at', {
        time: DateTime.local()
          .plus({ seconds: expires_in })
          .toFormat('HH:mm:ss'),
      });
    } catch (e) {
      logger.error('Whoops. Throwing error.');
      throw e;
    }
  }

  /**
   * Returns album metadata from Spotify13  2453aETZ6µ
   */
  async getSpotifyMeta(spotifyAlbumId: string): Promise<{
    tracks: SpotifyApi.MultipleTracksResponse;
    album: SpotifyApi.SingleAlbumResponse;
  }> {
    try {
      const albumRes = await this.client.getAlbum(spotifyAlbumId);
      const trackIds = albumRes.body.tracks.items.map((track) => track.id);
      const tracksRes = await this.client.getTracks(trackIds);

      return {
        tracks: tracksRes.body,
        album: albumRes.body,
      };
    } catch (e: any) {
      console.error('SPOTIFY ERROR', e);
      throw e;
    }
  }
}

const SpotifyService = new SpotifyModel();
export default SpotifyService;
