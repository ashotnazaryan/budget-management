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
  amount?: Amount;
}

export interface Amount {
  net: string;
  gross: string;
  vatAmount: string;
  vatRate: string;
}

export interface NBPResponse {
  code: Currency['iso'];
  rates: {
    effectiveDate: string;
    mid: number;
  }[];
}
