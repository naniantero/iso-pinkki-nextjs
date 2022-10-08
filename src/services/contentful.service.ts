// /utils/ContentfulModel.js

import axios from 'axios';
import { CONTENTFUL_API_URL } from '@constants';

class ContentfulModel {
  api;

  constructor() {
    this.api = axios.create({
      baseURL: CONTENTFUL_API_URL,
      timeout: 30000,
    });
  }

  /**
   * Makes the Contentful API request using the access token and 
   * space ID provided in envs
   */
  async request(
    query: any
  ): Promise<
    | Contentful.AlbumCollectionResponse
    | Contentful.AlbumResponse
  > {
    const spaceId = `${process.env.CONTENTFUL_SPACE_ID}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await this.api.post(
        spaceId,
        JSON.stringify({ query }),
        config
      );
      return res.data?.data;
    } catch (error) {
      throw error;
    }
  }
}

const ContentfulService = new ContentfulModel();
export default ContentfulService;
