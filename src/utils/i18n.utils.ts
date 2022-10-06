import { DateTime } from 'luxon';

/**
 * Returns ISO date in an user friendly format
 * Used by <Date />
 */
export const getLocalizedDate = (
  date?: string | Date,
  includeYear?: boolean,
  yearOnly?: boolean
): string => {
  if (!date) return '';
  let format = 'dd.MM.';

  if (includeYear) format = `${format}yyyy`;
  if (yearOnly) format = 'yyyy';

  return DateTime.fromISO(date as string).toFormat(format) ?? '';
};
