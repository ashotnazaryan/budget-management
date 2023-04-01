import moment from 'moment';
import { IconType, Transaction, TransactionDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransactions = (transactions: TransactionDTO[], showDecimals = false): Transaction[] => {
  if (!transactions?.length) {
    return [];
  }

  return transactions.map((transaction) => ({
    ...transaction,
    id: transaction._id,
    amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
    percentValue: `${transaction.percentValue}%`,
    createdAt: moment(transaction.createdAt).format('LL'),
    icon: transaction.icon as IconType
  }));
};
