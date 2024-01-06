import { Currency } from './common';

export interface ReportDTO {
  id: string;
  userId: string;
  month: number;
  currency: Currency['iso'];
  value: number;
}

export interface Report {
  id: string;
  userId: string;
  month: number;
  currency: Currency['iso'];
  value: number;
}
