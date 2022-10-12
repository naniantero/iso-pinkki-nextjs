import withRedis from 'middleware/redis.middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import RedisService from '@services/redis.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { albumId },
  } = req;
  /**
   * Returns an album (and its Spotify meta data) by ID
   */
  if (req.method === 'GET') {
    await RedisService.flushAlbums(albumId as string | undefined);
    return res.status(200).json({ ok: true });
  }

  return res.status(405);
};

export default withRedis(handler);
