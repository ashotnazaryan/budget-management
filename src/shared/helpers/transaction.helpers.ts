import date from 'core/date';
import { IconType, Transaction, TransactionDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransactions = (transactions: TransactionDTO[], showDecimals = false): Transaction[] => {
  return transactions.map((transaction) => {
    return mapTransaction(transaction, showDecimals);
  });
};

export const mapTransaction = (transaction: TransactionDTO, showDecimals = false): Transaction => {
  return {
    ...transaction,
    amount: mapNumberToCurrencyString(transaction.amount, transaction.currencyIso, showDecimals),
    percentValue: transaction.percentValue ? `${transaction.percentValue}%` : undefined,
    createdAt: date(transaction.createdAt).format(),
    icon: transaction.icon as IconType
  };
};
