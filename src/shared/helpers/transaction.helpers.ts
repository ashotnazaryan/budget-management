import moment from 'moment';
import { Transaction, TransactionDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransactions = (transactions: TransactionDTO[], showDecimals = false): Transaction[] => {
  if (!transactions?.length) {
    return [];
  }

  return transactions.map((transaction) => ({
    ...transaction,
    id: transaction._id,
    amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
    categoryExpenseValue: `${transaction.categoryExpenseValue}%`,
    createdAt: moment(transaction.createdAt).format('LL')
  }));
};
