import moment from 'moment';
import { Transaction, TransactionDTO } from 'shared/models';

export const mapTransactions = (transactions: TransactionDTO[]): Transaction[] => {
  if (!transactions?.length) {
    return [];
  }

  return transactions.map((transaction) => ({
    ...transaction,
    id: transaction._id,
    categoryExpenseValue: `${transaction.categoryExpenseValue}%`,
    createdAt: moment(transaction.createdAt).format('LL')
  }));
};
