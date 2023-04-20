import { FieldError } from 'react-hook-form';

/* eslint-disable no-unused-vars */
export enum TransactionField {
  amount = 'amount',
  categoryId = 'categoryId',
  type = 'type',
  icon = 'icon',
  accountId = 'accountId',
  createdAt = 'createdAt',
  note = 'note'
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

type FieldErrorType = FieldError['type'];

export type ErrorType = Partial<{ [key in FieldErrorType]: { message: string } }>;
