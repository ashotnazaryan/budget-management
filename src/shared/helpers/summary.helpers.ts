import moment from 'moment';
import { SummaryDTO, Summary, IconType } from 'shared/models';
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
      id: transaction._id,
      amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: moment(transaction.createdAt).format('LL'),
      icon: transaction.icon as IconType
    })),
    categoryIncomeTransactions: summary.categoryIncomeTransactions.map((transaction) => ({
      ...transaction,
      id: transaction._id,
      amount: mapNumberToCurrencyString(transaction.amount, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: moment(transaction.createdAt).format('LL'),
      icon: transaction.icon as IconType
    }))
  };
};

export const mapBalance = (balance: SummaryDTO['balance'], showDecimals = false): Summary['balance'] => {
  return mapNumberToCurrencyString(balance, showDecimals);
};
