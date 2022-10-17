import { ALBUM_QUERY_PAGE_SIZE } from '@constants';
import ContentfulService from '@services/contentful.service';
import RedisService from '@services/redis.service';
import withRedis from 'middleware/redis.middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { Type } from 'types/contentful';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const take = Number(req.query.take ?? ALBUM_QUERY_PAGE_SIZE);
  const skip = Number(req.query.skip ?? 0);
  let albumTypes = req.query.albumTypes as any;
  albumTypes = albumTypes.split('|');

  const firstPageRedisKey = `albums_0`;
  
  // First page with all types enabled
  const isInitialData = skip === 0 && Object.values(Type).length === albumTypes.length;

  if (req.method === 'GET') {
    try {
      // Let's check the cache if the first page is requested
      if (isInitialData) {
        const cache = await RedisService.get(firstPageRedisKey);
        if (cache) return res.status(200).json(cache);
      }

      const albumsRes = await ContentfulService.getAlbums(
        take,
        skip,
        albumTypes
      );

      // Store the first page into Redis cache for a quicker page load
      if (isInitialData) await RedisService.set(firstPageRedisKey, albumsRes);

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
