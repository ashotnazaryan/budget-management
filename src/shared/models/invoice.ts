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
  sellerName: string;
  sellerAddress: string;
  sellerLocation: string;
  sellerVatID: string;
  sellerAccount: string;
  buyerName: string;
  buyerAddress: string;
  buyerLocation: string;
  buyerVatID: string;
}
