import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';

/**
 * Fetches IDs of all albums
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const graphQlQuery = `{
    albumCollection(order: releasedAt_DESC) {
      total
      items {
        sys {
          id
        }
      }
    }
  }`;

  try {
    const contentfulResponse = (await ContentfulService.request(
      graphQlQuery
    )) as Contentful.AlbumCollectionResponse;

    const collection = { ...contentfulResponse.albumCollection };
    const ids = collection.items.map((item) => item.sys.id);

    return res.status(200).json(ids);
  } catch (error: any) {
    return res
      .status(error?.response?.status ?? 500)
      .send(error?.response?.data);
  }
};

export default handler;
