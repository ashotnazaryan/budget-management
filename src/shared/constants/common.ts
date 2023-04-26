import { Period, PeriodOption } from 'shared/models';

export const POSITIVE_NUMERIC_REGEX: RegExp = /^[1-9]\d*(\.\d+)?$|^(0\.([1-9]\d*|\d*[1-9]))$/;
export const NUMERIC_REGEX: RegExp = /^-?\d+(\.\d+)?$/;
export const DATE_FORMAT = 'MMM D, YYYY';

export const PERIOD_OPTIONS: PeriodOption[] = [
  {
    value: Period.day,
    label: 'COMMON.DAY'
  },
  {
    value: Period.week,
    label: 'COMMON.WEEK'
  },
  {
    value: Period.month,
    label: 'COMMON.MONTH'
  },
  {
    value: Period.year,
    label: 'COMMON.YEAR'
  },
  {
    value: Period.allTime,
    label: 'COMMON.ALL_TIME'
  }
];
