/* eslint-disable no-unused-vars */
import { AccountField, CategoryField, ErrorType, TransactionField } from 'shared/models';

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
  [TransactionField.accountId]: {
    required: {
      message: 'Account is required'
    }
  },
  [TransactionField.icon]: {},
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
  },
  [AccountField.currencyIso]: {
    required: {
      message: 'Currency is required'
    }
  }
});

export const categoryHelper = (): { [key in CategoryField]: ErrorType } => ({
  [CategoryField.icon]: {
    required: {
      message: 'Icon is required'
    }
  },
  [CategoryField.name]: {
    required: {
      message: 'Name is required'
    }
  },
  [CategoryField.type]: {
    required: {
      message: 'Category type is required'
    }
  }
});
