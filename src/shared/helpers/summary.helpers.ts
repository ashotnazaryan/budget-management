import moment from 'moment';
import { SummaryDTO, SummaryState } from 'shared/models';

export const mapSummary = (summary: SummaryDTO): SummaryState => {
  if (!summary) {
    return {} as SummaryState;
  }

  return {
    ...summary,
    categoryExpenseTransactions: summary.categoryExpenseTransactions.map((transaction) => ({
      ...transaction,
      categoryExpenseValue: `${transaction.categoryExpenseValue}%`,
      createdAt: moment(transaction.createdAt).format('LL')
    }))
  };
};
