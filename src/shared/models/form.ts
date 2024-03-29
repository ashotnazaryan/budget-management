import { FieldError, FieldValues, RegisterOptions } from 'react-hook-form';

/* eslint-disable no-unused-vars */
export enum TransactionField {
  amount = 'amount',
  categoryId = 'categoryId',
  type = 'type',
  icon = 'icon',
  accountId = 'accountId',
  createdAt = 'createdAt',
  note = 'note',
  name = 'name'
}

export enum AccountField {
  balance = 'balance',
  icon = 'icon',
  name = 'name',
  currencyIso = 'currencyIso'
}

export enum CategoryField {
  icon = 'icon',
  name = 'name',
  type = 'type'
}

export enum TransferField {
  fromAccount = 'fromAccount',
  toAccount = 'toAccount',
  amount = 'amount',
  createdAt = 'createdAt'
}

export enum InvoiceField {
  name = 'name',
  salary = 'salary',
  currencyIso = 'currencyIso',
  month = 'month',
  createdAt = 'createdAt',
  vatIncluded = 'vatIncluded',
  sellerName = 'sellerName',
  sellerAddress = 'sellerAddress',
  sellerLocation = 'sellerLocation',
  sellerVatID = 'sellerVatID',
  sellerAccount = 'sellerAccount',
  buyerName = 'buyerName',
  buyerAddress = 'buyerAddress',
  buyerLocation = 'buyerLocation',
  buyerVatID = 'buyerVatID'
}

export enum ProfileField {
  streetAddress = 'streetAddress',
  streetAddressLine = 'streetAddressLine',
  city = 'city',
  region = 'region',
  zipCode = 'zipCode',
  countryCode = 'countryCode',
  taxId = 'taxId',
  accountNumber = 'accountNumber'
}

type FieldErrorType = FieldError['type'];
type Validate<T> = {
  [key: string]: (value: T) => boolean | string | Promise<boolean | string>;
};

export type ErrorType = Partial<{ [key in FieldErrorType]: { message: string } }>;

export type FormControlRules = Omit<RegisterOptions<FieldValues, string>, 'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'> | {
  validate?: Validate<FieldValues>;
} | undefined;
