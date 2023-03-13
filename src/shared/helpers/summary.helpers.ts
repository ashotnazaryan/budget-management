import moment from 'moment';
import { SummaryDTO, SummaryState } from 'shared/models';

export const mapSummary = (summary: SummaryDTO): SummaryState => {
  if (!summary) {
    return {} as SummaryState;
  }

  return {
    ...summary,
    transactions: summary.transactions.map((transaction) => ({
      ...transaction,
      createdAt: moment(transaction.createdAt).format('LL')
    })),
    categoryTransactions: summary.categoryTransactions.map((transaction) => ({
      ...transaction,
      createdAt: moment(transaction.createdAt).format('LL')
    }))
  };
};
