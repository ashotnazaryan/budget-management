import { Currency } from './common';

export interface InvoiceAmountDTO {
  net: number;
  gross: number;
  vatAmount: number;
  vatRate: number;
  currencyIso: Currency['iso'];
}

export interface InvoiceAmount {
  net: string;
  gross: string;
  vatAmount: string;
  vatRate: number;
  currencyIso: Currency['iso'];
}

export interface InvoiceDTO {
  id: string;
  name: string;
  salary: string;
  currencyIso: Currency['iso'];
  month: number;
  createdAt: Date;
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
  amount: InvoiceAmountDTO;
}

export interface Invoice {
  id: string;
  name: string;
  salary: string;
  currencyIso: Currency['iso'];
  month: number;
  createdAt: string;
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
  amount: InvoiceAmount;
}
