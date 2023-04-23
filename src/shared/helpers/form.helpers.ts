/* eslint-disable no-unused-vars */
import { AccountField, CategoryField, ErrorType, TransactionField, TransferField } from 'shared/models';

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
  [TransactionField.type]: {
    required: {
      message: 'TRANSACTIONS.ERRORS.REQUIRED_TYPE'
    }
  },
  [TransactionField.createdAt]: {
    max: {
      message: 'TRANSACTIONS.ERRORS.FUTURE_DATE'
    }
  },
  [TransactionField.icon]: {},
  [TransactionField.note]: {}
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

export const transferHelper = (): { [key in TransferField]: ErrorType } => ({
  [TransferField.fromAccount]: {
    required: {
      message: 'TRANSFERS.ERRORS.REQUIRED_FROM_ACCOUNT'
    }
  },
  [TransferField.toAccount]: {
    required: {
      message: 'TRANSFERS.ERRORS.REQUIRED_TO_ACCOUNT'
    }
  },
  [TransferField.amount]: {
    required: {
      message: 'TRANSFERS.ERRORS.REQUIRED_AMOUNT'
    },
    pattern: {
      message: 'TRANSFERS.ERRORS.INVALID_AMOUNT'
    }
  },
  [TransferField.createdAt]: {},
});
