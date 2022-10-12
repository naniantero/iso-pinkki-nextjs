import { ALBUM_QUERY_PAGE_SIZE } from '@constants';
import ContentfulService from '@services/contentful.service';
import RedisService from '@services/redis.service';
import withRedis from 'middleware/redis.middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const take = Number(req.query.take ?? ALBUM_QUERY_PAGE_SIZE);
  const skip = Number(req.query.skip ?? 0);
  const firstPageRedisKey = `albums_0`;

  if (req.method === 'GET') {
    try {
      // Let's check the cache if the first page is requested
      if (skip === 0) {
        const cache = await RedisService.get(firstPageRedisKey);
        if (cache) return res.status(200).json(cache);
      }

      const albumsRes = await ContentfulService.getAlbums(take, skip);
      
      // Store the first page into Redis cache for a quicker page load
      if (skip === 0) await RedisService.set(firstPageRedisKey, albumsRes);

      return res.status(200).json(albumsRes);
    } catch (error: any) {
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data);
    }
  }
  return res.status(405);
};

export default withRedis(handler);
