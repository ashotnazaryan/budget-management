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
  amount?: Amount;
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
  amount?: Amount;
}

export interface Amount {
  net: number;
  gross: number;
  vatAmount: number;
  vatRate: number;
}

export interface NBPResponse {
  code: Currency['iso'];
  rates: {
    effectiveDate: string;
    mid: number;
  }[];
}
