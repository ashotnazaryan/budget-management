import { FieldError } from 'react-hook-form';

/* eslint-disable no-unused-vars */
export enum TransactionField {
  amount = 'amount',
  categoryId = 'categoryId',
  type = 'type'
}

export enum AccountField {
  initialAmount = 'initialAmount',
  icon = 'icon',
  name = 'name'
}

type FieldErrorType = FieldError['type'];

export type ErrorType = Partial<{ [key in FieldErrorType]: { message: string } }>;
