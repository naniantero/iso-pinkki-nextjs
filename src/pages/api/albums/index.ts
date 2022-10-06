import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';
import mock from '../MOCK.json';
import { ALBUM_QUERY_PAGE_SIZE } from '../../../constants/query.constants';

const USE_MOCK = false;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const take = Number(req.query.take ?? ALBUM_QUERY_PAGE_SIZE);
  const skip = Number(req.query.skip ?? 0);

  const graphQlQuery = `{
    albumCollection(limit: ${take}, skip: ${skip}, order: releasedAt_DESC) {
      total
      items {
        title
        sys {
          id
        }
        type
        releasedAt
        featuredImage {
          ... on Asset {
            url(transform: {width: 300, height: 300})
          }
        }
        reissue
        formats
        artist {
          ... on Artist {
            name
          }
        }
      }
    }
  }`;

  try {
    let source;

    if (USE_MOCK) {
      source = { ...mock } as ContentfulAlbumCollectionResponse;
      source.albumCollection.items = source.albumCollection.items.slice(
        skip,
        skip + take
      );
    } else {
      const contentfulResponse = await ContentfulService.request(graphQlQuery) as ContentfulAlbumCollectionResponse
      source = contentfulResponse;
    }

    const collection = { ...source.albumCollection };
    collection.items = collection.items.map((item) => ({
      ...item,
      id: item.sys.id,
    }));

    return res.status(200).json(collection);
  } catch (error: any) {
    return res
      .status(error?.response?.status ?? 500)
      .send(error?.response?.data);
  }
};

export default handler;
