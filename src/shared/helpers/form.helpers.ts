/* eslint-disable no-unused-vars */
import { AccountField, CategoryField, ErrorType, TransactionField } from 'shared/models';

export const transactionHelper = (): { [key in TransactionField]: ErrorType } => ({
  [TransactionField.amount]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_AMOUNT'
    },
    pattern: {
      message: 'TRANSACTIONS.ERRORS.INVALID_AMOUNT'
    }
  },
  [TransactionField.categoryId]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_CATEGORY'
    }
  },
  [TransactionField.accountId]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_ACCOUNT'
    }
  },
  [TransactionField.currencyIso]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_CURRENCY'
    }
  },
  [TransactionField.type]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_TYPE'
    }
  },
  [TransactionField.icon]: {},
  [TransactionField.createdAt]: {}
});

export const accountHelper = (): { [key in AccountField]: ErrorType } => ({
  [AccountField.balance]: {
    required: {
      message: 'ACCOUNTS.ERRORS.REQUIRED_BALANCE'
    },
    pattern: {
      message: 'ACCOUNTS.ERRORS.INVALID_BALANCE'
    }
  },
  [AccountField.icon]: {
    required: {
      message: 'ACCOUNTS.ERRORS.REQUIRED_ICON'
    }
  },
  [AccountField.name]: {
    required: {
      message: 'ACCOUNTS.ERRORS.REQUIRED_NAME'
    }
  },
  [AccountField.currencyIso]: {
    required: {
      message: 'ACCOUNTS.ERRORS.REQUIRED_CURRENCY'
    }
  }
});

export const categoryHelper = (): { [key in CategoryField]: ErrorType } => ({
  [CategoryField.icon]: {
    required: {
      message: 'CATEGORIES.ERRORS.REQUIRED_ICON'
    }
  },
  [CategoryField.name]: {
    required: {
      message: 'CATEGORIES.ERRORS.REQUIRED_NAME'
    }
  },
  [CategoryField.type]: {
    required: {
      message: 'CATEGORIES.ERRORS.REQUIRED_TYPE'
    }
  }
});
