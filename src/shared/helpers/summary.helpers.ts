import date from 'core/date';
import { SummaryDTO, Summary, IconType, Currency, Locale } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapSummary = (summary: SummaryDTO, currencyIso: Currency['iso'], locale: Locale['isoIntl'], showDecimals = false): Summary => {
  if (!summary) {
    return {} as Summary;
  }

  return {
    ...summary,
    incomes: mapNumberToCurrencyString(summary.incomes, currencyIso, locale, showDecimals),
    expenses: mapNumberToCurrencyString(summary.expenses, currencyIso, locale, showDecimals),
    profit: mapNumberToCurrencyString(summary.profit, currencyIso, locale, showDecimals),
    balance: mapNumberToCurrencyString(summary.balance, currencyIso, locale, showDecimals),
    categoryExpenseTransactions: summary.categoryExpenseTransactions.map((transaction) => ({
      ...transaction,
      amount: mapNumberToCurrencyString(transaction.amount, currencyIso, locale, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: date(transaction.createdAt).format(),
      icon: transaction.icon as IconType
    })),
    categoryIncomeTransactions: summary.categoryIncomeTransactions.map((transaction) => ({
      ...transaction,
      amount: mapNumberToCurrencyString(transaction.amount, currencyIso, locale, showDecimals),
      percentValue: `${transaction.percentValue}%`,
      createdAt: date(transaction.createdAt).format(),
      icon: transaction.icon as IconType
    }))
  };
};

export const mapBalance = (balance: SummaryDTO['balance'], currencyIso: Currency['iso'], locale: Locale['isoIntl'], showDecimals = false): Summary['balance'] => {
  return mapNumberToCurrencyString(balance, currencyIso, locale, showDecimals);
};
