import { DateTime } from 'luxon';

/**
 * Returns ISO date in an user friendly format
 * Used by <Date />
 */
export const getLocalizedDate = (
  date?: string | Date,
  includeYear?: boolean
) => {
  if (!date) return undefined;
  let format = 'dd.MM.';
  if (includeYear) format = `${format}yyyy`;
  return DateTime.fromISO(date as string).toFormat(format);
};
