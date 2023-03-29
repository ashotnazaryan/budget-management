import moment from 'moment';
import { SummaryDTO, Summary } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapSummary = (summary: SummaryDTO, showDecimals = false): Summary => {
  if (!summary) {
    return {} as Summary;
  }

  return {
    ...summary,
    incomes: mapNumberToCurrencyString(summary.incomes, showDecimals),
    expenses: mapNumberToCurrencyString(summary.expenses, showDecimals),
    balance: mapNumberToCurrencyString(summary.balance, showDecimals),
    categoryExpenseTransactions: summary.categoryExpenseTransactions.map((transaction) => ({
      ...transaction,
      amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: moment(transaction.createdAt).format('LL')
    })),
    categoryIncomeTransactions: summary.categoryIncomeTransactions.map((transaction) => ({
      ...transaction,
      amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: moment(transaction.createdAt).format('LL')
    }))
  };
};

export const mapBalance = (balance: SummaryDTO['balance'], showDecimals = false): Summary['balance'] => {
  return mapNumberToCurrencyString(balance, showDecimals);
};
