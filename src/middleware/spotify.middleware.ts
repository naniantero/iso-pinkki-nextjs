import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import SpotifyService from '../services/spotify.service';

/**
 * SpotifyAPI needs to initialize before making any requests.
 * Can be used as a wrapper in API routes, e.g. [album.ts]
 */
const withSpotify = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await SpotifyService.init();
    return handler(req, res);
  };
};

export default withSpotify;
