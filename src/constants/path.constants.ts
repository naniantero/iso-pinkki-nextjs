/**
 * Routes/pages available
 */
export const ROUTES = Object.freeze({
  index: '/',
  singleAlbum: '/album/{albumId}',
});

/**
 * All the available API routes
 * API routes are needed for secure passing of Contentufl secret keys
 */
export const API_ROUTES = Object.freeze({
  albums: '/api/albums',
  singleAlbum: '/api/albums/{albumId}',
  albumIds: '/api/albums/ids',
  spotifyAuth: '/api/spotify/auth'
});
