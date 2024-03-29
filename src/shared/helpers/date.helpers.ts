import dayjs from 'dayjs';
import { StartEndDate } from 'shared/models';
import { DATE_FORMAT_ISO } from 'shared/constants';

export const getCurrentDate = (): string => {
  return dayjs().format(DATE_FORMAT_ISO);
};

export const getDate = (date: string): string => {
  return dayjs(date).format(DATE_FORMAT_ISO);
};

export const getLastSevenDaysOfPreviousMonth = (): StartEndDate => {
  const currentDate = dayjs();
  const lastMonthEndDate = currentDate.subtract(1, 'month').endOf('month');
  const lastMonthStartDate = lastMonthEndDate.subtract(6, 'day');

  return {
    startDate: lastMonthStartDate.format(DATE_FORMAT_ISO),
    endDate: lastMonthEndDate.format(DATE_FORMAT_ISO),
  };
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
  return dayjs().subtract(1, 'month').format('MMMM');
};

export const getPreviousMonthLongName = (): string => {
  return dayjs().subtract(1, 'month').format('MMMM YYYY');
};

export const getPreviousMonthIndex = (): number => {
  return dayjs().subtract(1, 'month').month();
};

export const getMonthShortNameByIndex = (index: number): string => {
  return dayjs().month(index).format('MMMM');
};
