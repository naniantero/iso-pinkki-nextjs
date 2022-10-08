declare namespace Contentful {
  interface AlbumCollectionResponse {
    albumCollection: AlbumCollection;
  }

  interface AlbumResponse {
    album: Album;
  }
  interface ApiAlbumResponse {
    total: number;
    years: AlbumsByYear[];
  }

  interface AlbumCollection {
    total: number;
    items: Album[];
  }

  interface AlbumsByYear {
    year: string;
    albums: Album[];
  }

  interface Album {
    title: string;
    id: string;
    sys: Sys;
    type: Type;
    description: null | string;
    releasedAt: string;
    featuredImage: FeaturedImage;
    reissue: boolean | null;
    ids: string[] | null;
    formats: Format[];
    bandcamp: null | string;
    tidal: null;
    artist: AlbumArtist;
    spotifyId?: string;
  }

  interface AlbumWithSpotify extends Album {
    spotify: {
      album: SpotifyApi.SingleAlbumResponse | null;
      tracks: SpotifyApi.MultipleTracksResponse | null;
      artist: SpotifyApi.SingleArtistResponse | null;
    };
  }

  interface AlbumArtist {
    name: string;
  }

  interface FeaturedImage {
    url: string;
  }

  enum Format {
    CD = 'cd',
    Digital = 'digital',
  }

  interface Sys {
    id: string;
  }

  enum Type {
    Album = 'album',
    Ep = 'ep',
    Single = 'single',
  }
}
