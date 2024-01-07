import { Currency } from './common';

export interface ReportItem {
  month: number;
  currencyIso: Currency['iso'];
  value: number;
}

export interface ReportDTO {
  id: string;
  userId: string;
  reports: ReportItem[];
  total: number;
  limit: number | undefined;
}

export interface Report {
  id: string;
  userId: string;
  reports: ReportItem[];
  total: string;
  limit: string;
}
