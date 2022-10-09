import withSpotify from 'middleware/spotify.middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';

/**
 * Fetches an album by ID
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Contentful.AlbumWithSpotify>
) => {
  const {
    query: { albumId },
  } = req;

  /**
   * Returns an album (and its Spotify meta data) by ID
   */
  if (req.method === 'GET') {
    const albumRes = await ContentfulService.getAlbum(albumId as string);

    try {
      return res.status(200).json(albumRes);
    } catch (error: any) {
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data);
    }
  }
};

export default withSpotify(handler);
