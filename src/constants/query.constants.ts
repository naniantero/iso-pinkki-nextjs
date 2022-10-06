/**
 * Keys used in React Queries
 * https://tanstack.com/query/v4/docs/guides/query-keys
 */
export const QUERY_KEYS = Object.freeze({
  albums: 'albums',
  singleAlbum: 'singleAlbum',
  albumIds: 'albumIds',
});

export const DEFAULT_STALE_TIME = Infinity;

/**
 * Default page size on the index page
 */
export const ALBUM_QUERY_PAGE_SIZE = 10;
