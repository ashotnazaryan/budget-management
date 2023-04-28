import { Dayjs } from 'dayjs';

/* eslint-disable no-unused-vars */
export type StatusState = 'idle' | 'loading' | 'succeeded' | 'failed';

export enum ManageMode {
  create = 'create',
  view = 'view',
  edit = 'edit'
}

export enum Period {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  allTime = 'allTime'
}

export interface ErrorResponse {
  message: string;
  status: number;
  messageKey?: string;
}

export interface DateRange {
  fromDate: Dayjs;
  toDate: Dayjs;
}

export interface PeriodOption {
  value: Period;
  label: string;
}
