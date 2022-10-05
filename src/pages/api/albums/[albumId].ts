import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';
import mock from '../MOCK.json';
import { ALBUM_QUERY_PAGE_SIZE } from '../../../constants/query.constants';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const USE_MOCK = false;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { albumId },
  } = req;

  const graphQlQuery = `{
    album(id: "${albumId}") {
      title
      sys {
        id
      }
      type
      description {
        ... on AlbumDescription {
          json
        }
      }
      releasedAt
      featuredImage {
        ... on Asset {
          url(transform: {width: 640, height: 640})
        }
      }
      reissue
      ids
      formats
      ean
      spotify
      bandcamp
      tidal
      artist {
        ... on Artist {
          name
        }
      }
    }
  }
  `;

  try {
    const contentfulResponse = (await ContentfulService.request(
      graphQlQuery
    )) as ContentfulAlbumResponse;

    let parsedDesc = contentfulResponse?.album?.description;
    if (parsedDesc) {
      parsedDesc = documentToHtmlString(parsedDesc as any);
    }

    return res
      .status(200)
      .json({ ...contentfulResponse.album, description: parsedDesc });
  } catch (error: any) {
    return res
      .status(error?.response?.status ?? 500)
      .send(error?.response?.data);
  }
};

export default handler;
