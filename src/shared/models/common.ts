import { Dayjs } from 'dayjs';

/* eslint-disable no-unused-vars */
export type StatusState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  nameKey: 'CURRENCIES.USD' | 'CURRENCIES.EUR' | 'CURRENCIES.PLN' | 'CURRENCIES.UAH' | 'CURRENCIES.AMD';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

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

export interface Option {
  value: string;
  label: string;
}
