import ContentfulService from '@services/contentful.service';
import RedisService from '@services/redis.service';
import withRedis from 'middleware/redis.middleware';
import withSpotify from 'middleware/spotify.middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { AlbumWithSpotify } from '../../../types/contentful';

/**
 * Fetches an album by ID
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AlbumWithSpotify>
) => {
  const {
    query: { albumId },
  } = req;

  /**
   * Returns an album (and its Spotify meta data) by ID
   */
  if (req.method === 'GET') {
    const redisKey = `albums_${albumId}`;
    const cache = await RedisService.get(redisKey);

    if (cache) {
      return res.status(200).json(cache);
    }

    try {
      const albumRes = await ContentfulService.getAlbum(albumId as string);
      await RedisService.set(redisKey, albumRes);
      return res.status(200).json(albumRes);
    } catch (error: any) {
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data);
    }
  }

  return res.status(405);
};

export default withRedis(withSpotify(handler));
