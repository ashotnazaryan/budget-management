import { FieldError } from 'react-hook-form';

/* eslint-disable no-unused-vars */
export enum TransactionField {
  amount = 'amount',
  categoryId = 'categoryId',
  type = 'type'
}

type FieldErrorType = FieldError['type'];

export type ErrorType = Partial<{ [key in FieldErrorType]: { message: string } }>;
