import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';

/**
 * Fetches IDs of all albums
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idsRes = ContentfulService.getAllAlbumIds();
    return res.status(200).json(idsRes);
  } catch (error: any) {
    return res
      .status(error?.response?.status ?? 500)
      .send(error?.response?.data);
  }
};

export default handler;
