import { DATE_FORMAT_ISO } from 'shared/constants';
import dayjs from 'dayjs';

export const getCurrentDate = (): string => {
  return dayjs().format(DATE_FORMAT_ISO);
};

export const getLastDateOfPreviousMonth = (): string => {
  const currentDate = dayjs();
  const date = currentDate.subtract(1, 'month').endOf('month');

  return date.format(DATE_FORMAT_ISO);
};

export const getFirstDateOfPreviousMonth = (): string => {
  const currentDate = dayjs();
  const date = currentDate.subtract(1, 'month').startOf('month');

  return date.format(DATE_FORMAT_ISO);
};

export const getDayOfCurrentMonth = (day: number): string => {
  const currentDate = dayjs();
  const date = currentDate.date(day);

  return date.format(DATE_FORMAT_ISO);
};

export const getPreviousMonthShortName = (): string => {
  const currentDate = dayjs();
  return currentDate.subtract(1, 'month').format('MMMM');
};

export const getPreviousMonthLongName = (): string => {
  const currentDate = dayjs();
  return currentDate.subtract(1, 'month').format('MMMM YYYY');
};
