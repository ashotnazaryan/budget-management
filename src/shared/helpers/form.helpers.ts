/* eslint-disable no-unused-vars */
import { AccountField, CategoryField, ErrorType, InvoiceField, ProfileField, TransactionField, TransferField } from 'shared/models';

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
  [TransactionField.note]: {},
  [TransactionField.name]: {}
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

export const invoiceHelper = (): { [key in InvoiceField]: ErrorType } => ({
  [InvoiceField.name]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_NAME'
    }
  },
  [InvoiceField.salary]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SALARY'
    },
    pattern: {
      message: 'INVOICES.ERRORS.INVALID_SALARY'
    }
  },
  [InvoiceField.currencyIso]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_CURRENCY'
    }
  },
  [InvoiceField.sellerName]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SELLER_NAME'
    },
  },
  [InvoiceField.sellerAddress]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SELLER_ADDRESS'
    },
  },
  [InvoiceField.sellerLocation]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SELLER_LOCATION'
    },
  },
  [InvoiceField.sellerVatID]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SELLER_VAT_ID'
    },
  },
  [InvoiceField.sellerAccount]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_SELLER_ACCOUNT'
    },
  },
  [InvoiceField.buyerName]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_BUYER_NAME'
    },
  },
  [InvoiceField.buyerAddress]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_BUYER_ADDRESS'
    },
  },
  [InvoiceField.buyerLocation]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_BUYER_LOCATION'
    },
  },
  [InvoiceField.buyerVatID]: {
    required: {
      message: 'INVOICES.ERRORS.REQUIRED_BUYER_VAT_ID'
    },
  },
  [InvoiceField.vatIncluded]: {},
});

export const profileHelper = (): { [key in ProfileField]: ErrorType } => ({
  [ProfileField.streetAddress]: {},
  [ProfileField.streetAddressLine]: {},
  [ProfileField.city]: {},
  [ProfileField.region]: {},
  [ProfileField.zipCode]: {},
  [ProfileField.countryCode]: {},
  [ProfileField.taxId]: {},
  [ProfileField.accountNumber]: {}
});
