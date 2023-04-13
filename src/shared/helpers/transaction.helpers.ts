import dayjs from 'dayjs';
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
    amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
    percentValue: `${transaction.percentValue}%`,
    createdAt: dayjs(transaction.createdAt).format('MMM D, YYYY'),
    icon: transaction.icon as IconType
  };
};
