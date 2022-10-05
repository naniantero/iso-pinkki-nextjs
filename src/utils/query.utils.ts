/**
 * Creates a query array based on queryKey and pagination params
 */
export const getPaginationQueryArray = (
  queryKey: string,
  paginationParams: PaginationDto
) => {
  return [queryKey, paginationParams.take ?? 0, paginationParams.skip ?? 0];
};
