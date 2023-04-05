import { FieldError } from 'react-hook-form';

/* eslint-disable no-unused-vars */
export enum TransactionField {
  amount = 'amount',
  categoryId = 'categoryId',
  type = 'type',
  icon = 'icon',
  accountId = 'accountId'
}

export enum AccountField {
  initialAmount = 'initialAmount',
  icon = 'icon',
  name = 'name',
  currencyIso = 'currencyIso'
}

export enum CategoryField {
  icon = 'icon',
  name = 'name',
  type = 'type'
}

type FieldErrorType = FieldError['type'];

export type ErrorType = Partial<{ [key in FieldErrorType]: { message: string } }>;
