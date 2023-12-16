import { Currency } from './common';

export interface InvoiceDTO {
  id: string;
  name: string;
}

export interface Invoice {
  id: string;
  title: string;
  salary: string;
  currencyIso: Currency['iso'];
  vatIncluded: boolean;
}
