// /utils/ContentfulModel.js

import axios from 'axios';
import { log } from 'next-axiom';
import SpotifyService from './spotify.service';

const logger = log.with({ scope: 'contentful' });

const CONTENTFUL_API_URL = 'https://graphql.contentful.com/content/v1/spaces';

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
  ): Promise<Contentful.AlbumCollectionResponse | Contentful.AlbumResponse> {
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
      logger.error('Request to Contentful API failed');
      throw error;
    }
  }

  /**
   * Returns album (and Spotify metadata) by ID
   */
  async getAlbum(albumId: string) {
    const graphQlQuery = `{
      album(id: "${albumId}") {
        title
        sys {
          id
        }
        type
        releasedAt
        featuredImage {
          ... on Asset {
            url(transform: {width: 640, height: 640})
          }
        }
        reissue
        ids
        formats
        bandcamp
        tidal
        spotifyId
        artist {
          ... on Artist {
            name
          }
        }
      }
    }`;

    try {
      const contentfulResponse = (await this.request(
        graphQlQuery
      )) as Contentful.AlbumResponse;

      const {
        album: { spotifyId },
      } = contentfulResponse;

      // Fetches the album metadata by ID.
      const spotify = spotifyId
        ? await SpotifyService.getSpotifyMeta(spotifyId)
        : null;

      return {
        ...contentfulResponse.album,
        spotify,
      };
    } catch (error: any) {
      logger.error('Get album request failed');
      throw error;
    }
  }

  /**
   * Returns a paginated list of albums. Used on index page timeline.
   */
  async getAlbums(take: number, skip: number) {
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
      const contentfulResponse = (await this.request(
        graphQlQuery
      )) as Contentful.AlbumCollectionResponse;

      const collection = { ...contentfulResponse.albumCollection };
      collection.items = collection.items.map((item) => ({
        ...item,
        id: item.sys.id,
      }));
      return collection;
    } catch (error) {
      logger.error('Get albums request failed');
      throw error;
    }
  }

  /**
   * Returns IDs of all albums in the database
   * Used in single album navigation
   */
  async getAllAlbumIds() {
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
      const contentfulResponse = (await this.request(
        graphQlQuery
      )) as Contentful.AlbumCollectionResponse;

      const collection = { ...contentfulResponse.albumCollection };
      return collection.items.map((item) => item.sys.id);
    } catch (error: any) {
      logger.error('Get album IDs request failed');
      throw error;
    }
  }
}

const ContentfulService = new ContentfulModel();
export default ContentfulService;
