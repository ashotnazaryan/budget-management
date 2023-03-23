import moment from 'moment';
import { Transaction, TransactionDTO } from 'shared/models';

export const mapTransactions = (transactions: TransactionDTO[]): Transaction[] => {
  if (!transactions?.length) {
    return [];
  }

  return transactions.map((transaction) => ({
    ...transaction,
    id: transaction._id,
    createdAt: moment(transaction.createdAt).format('LL')
  }));
};
