interface ContentfulAlbumCollectionResponse {
  albumCollection: AlbumCollection;
}

interface ContentfulAlbumResponse {
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
  title:         string;
  id:            string;
  sys:           Sys;
  type:          Type;
  description:   null | string;
  releasedAt:    string;
  featuredImage: FeaturedImage;
  reissue:       boolean | null;
  ids:           string[] | null;
  formats:       Format[];
  ean:           null;
  spotify:       null | string;
  bandcamp:      null | string;
  tidal:         null;
  artist:        AlbumArtist;
}

interface AlbumArtist {
  name: string;
}

interface FeaturedImage {
  url: string;
}

enum Format {
  CD = "cd",
  Digital = "digital",
}

interface Sys {
  id: string;
}

enum Type {
  Album = "album",
  Ep = "ep",
  Single = "single",
}
