import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ClientClosedError } from 'redis';
import RedisService from '../services/redis.service';

/**
 * Middleware for all the routes that use Redis
 */
const withRedis = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await RedisService.client.ping();
    } catch (e: any) {
      if (e instanceof ClientClosedError) {
        // Client is not connected to server, let's connect:
        await RedisService.client.connect();
      }
    }
    return handler(req, res);
  };
};

export default withRedis;
