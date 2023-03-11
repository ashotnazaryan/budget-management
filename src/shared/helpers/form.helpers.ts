/* eslint-disable no-unused-vars */
import { ErrorType, TransactionField } from 'shared/models';

export const transactionHelper = (): { [key in TransactionField]: ErrorType } => ({
  [TransactionField.amount]: {
    required: {
      message: 'Amount is required'
    },
    pattern: {
      message: 'Invalid amount'
    }
  },
  [TransactionField.categoryId]: {
    required: {
      message: 'Category is required'
    }
  },
  [TransactionField.type]: {}
});
