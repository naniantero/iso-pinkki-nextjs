import { NextApiRequest, NextApiResponse } from 'next';
import ContentfulService from '../../../services/contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import SpotifyService from '../../../services/spotify.service';
import withSpotify from 'middleware/spotify.middleware';

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
      bandcamp
      tidal
      spotifyId
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
    )) as Contentful.AlbumResponse;

    const {
      album: { description, spotifyId },
    } = contentfulResponse;
    let parsedDesc = description;
    if (parsedDesc) {
      parsedDesc = documentToHtmlString(parsedDesc as any);
    }

    let spotifyArtist = null;
    let spotifyTracks = null;
    let spotifyAlbum = null;

    if (spotifyId) {
      try {
        const albumRes = await SpotifyService.client.getAlbum(spotifyId);
        const artistRes = await SpotifyService.client.getArtist(
          albumRes.body.artists[0].id
        );
        const trackIds = albumRes.body.tracks.items.map((track) => track.id);
        const tracksRes = await SpotifyService.client.getTracks(trackIds);

        spotifyTracks = tracksRes.body;
        spotifyArtist = artistRes.body;
        spotifyAlbum = albumRes.body;
      } catch (e: any) {
        console.error('SPOTIFY ERROR', e);
        throw e;
      }
    }
    return res.status(200).json({
      ...contentfulResponse.album,
      description: parsedDesc,
      spotify: {
        tracks: spotifyTracks,
        album: spotifyAlbum,
        artist: spotifyArtist,
      },
    });
  } catch (error: any) {
    return res
      .status(error?.response?.status ?? 500)
      .send(error?.response?.data);
  }
};

export default withSpotify(handler);
