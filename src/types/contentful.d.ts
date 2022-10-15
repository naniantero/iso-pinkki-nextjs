export interface AlbumCollectionResponse {
  albumCollection: AlbumCollection;
}

export interface AlbumResponse {
  album: Album;
}
export interface ApiAlbumResponse {
  total: number;
  years: AlbumsByYear[];
}

export interface AlbumCollection {
  total: number;
  items: Album[];
}

export interface AlbumsByYear {
  year: string;
  albums: Album[];
}

export interface Album {
  title: string;
  id: string;
  sys: Sys;
  type: Type;
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

export interface AlbumWithSpotify extends Album {
  spotify: {
    album: SpotifyApi.SingleAlbumResponse;
    tracks: SpotifyApi.MultipleTracksResponse;
  } | null;
}

export interface AlbumArtist {
  name: string;
}

export interface FeaturedImage {
  url: string;
}

export enum Format {
  CD = 'cd',
  Digital = 'digital',
}

export interface Sys {
  id: string;
}

export enum Type {
  Album = 'album',
  Ep = 'ep',
  Single = 'single',
}
