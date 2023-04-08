import moment from 'moment';
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
    createdAt: moment(transaction.createdAt).format('LL'),
    icon: transaction.icon as IconType
  };
};
