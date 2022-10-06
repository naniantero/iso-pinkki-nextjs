// /utils/ContentfulModel.js

import axios from 'axios';
import { CONTENTFUL_API_URL } from '@constants';

class ContentfulModel {
  async request(
    query: any
  ): Promise<ContentfulAlbumCollectionResponse | ContentfulAlbumResponse> {
    const fetchUrl = `${CONTENTFUL_API_URL}/${process.env.CONTENTFUL_SPACE_ID}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(fetchUrl, JSON.stringify({ query }), config);
      return res.data?.data;
    } catch (error) {
      throw error;
    }
  }
}

const ContentfulService = new ContentfulModel();
export default ContentfulService;
