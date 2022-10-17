export interface AlbumMetaData {
  spotify: {
    album: SpotifyApi.SingleAlbumResponse;
    tracks: SpotifyApi.MultipleTracksResponse;
  } | null;
}