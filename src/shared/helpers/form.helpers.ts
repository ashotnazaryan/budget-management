/* eslint-disable no-unused-vars */
import { AccountField, ErrorType, TransactionField } from 'shared/models';

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

export const accountHelper = (): { [key in AccountField]: ErrorType } => ({
  [AccountField.initialAmount]: {
    required: {
      message: 'Amount is required'
    },
    pattern: {
      message: 'Invalid amount'
    }
  },
  [AccountField.icon]: {
    required: {
      message: 'Icon is required'
    }
  },
  [AccountField.name]: {
    required: {
      message: 'Name is required'
    }
  }
});
