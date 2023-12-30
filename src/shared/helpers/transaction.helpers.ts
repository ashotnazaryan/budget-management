import date from 'core/date';
import { IconType, Locale, Transaction, TransactionDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransactions = (transactions: TransactionDTO[], locale: Locale['isoIntl'], showDecimals = false): Transaction[] => {
  return transactions.map((transaction) => {
    return mapTransaction(transaction, locale, showDecimals);
  });
};

export const mapTransaction = (transaction: TransactionDTO, locale: Locale['isoIntl'], showDecimals = false): Transaction => {
  return {
    ...transaction,
    amount: mapNumberToCurrencyString(transaction.amount, transaction.currencyIso, locale, showDecimals),
    percentValue: transaction.percentValue ? `${transaction.percentValue}%` : undefined,
    createdAt: date(transaction.createdAt).format(),
    icon: transaction.icon as IconType
  };
};
