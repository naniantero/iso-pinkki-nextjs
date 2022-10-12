import dayjs from "dayjs";


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
  let format = 'DD.MM.';

  if (includeYear) format = `${format}YYYY`;
  if (yearOnly) format = 'YYYY';

  return dayjs(date).format(format) ?? '';
};
