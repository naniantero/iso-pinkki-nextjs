import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';
import { ALBUM_QUERY_PAGE_SIZE } from '@constants';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const take = Number(req.query.take ?? ALBUM_QUERY_PAGE_SIZE);
  const skip = Number(req.query.skip ?? 0);

  if (req.method === 'GET') {
    try {
      const albumsRes = await ContentfulService.getAlbums(take, skip);
      return res.status(200).json(albumsRes);
    } catch (error: any) {
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data);
    }
  }
};

export default handler;
