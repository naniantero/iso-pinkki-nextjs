import { log } from 'next-axiom';
import { createClient } from 'redis';

const logger = log.with({ scope: 'redis' });

class Redis {
  client?: any;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on('connect', () => {
      logger.info('Connecting to a server..');
    });

    this.client.on('ready', () => {
      logger.info('Connection established');
    });

    this.client.on('reconnecting', () => {
      logger.info('Reconnecting to server..');
    });

    this.client.on('error', (error: any) => {
      logger.error('Something went wrong', { error });
    });
  }

  /**
   * Gets a cached data based on a key
   */
  async get(key: string) {
    const cache = await this.client?.get(key);
    if (!cache) return undefined;
    // Not the most recommended way of doing things, bud it'll do on this site
    return JSON.parse(cache);
  }

  /**
   * Sets new cached data
   */
  async set(key: string, data: any) {
    // Not the most recommended way of doing things, bud it'll do on this site
    return this.client?.set(key, JSON.stringify(data));
  }

  /**
   * Flushes cached content based on albumId. If ID is undefined, we'll flush all
   * the data
   */
  async flushAlbums(albumId?: string) {
    if (albumId) return this.client.flush(albumId);
    return this.client.flushAll();
  }
}

const RedisService = new Redis();
export default RedisService;
