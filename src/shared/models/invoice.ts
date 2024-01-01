import { Currency } from './common';

export interface InvoiceDTO {
  id: string;
  name: string;
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
  amount?: InvoiceAmount;
}

export interface Invoice {
  id: string;
  name: string;
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
  amount?: InvoiceAmount;
}

export interface InvoiceAmount {
  net: number;
  gross: number;
  vatAmount: number;
  vatRate: number;
}
