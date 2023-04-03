import { Transaction, TransactionDTO } from './transaction';

export interface SummaryDTO {
  incomes: number;
  expenses: number;
  balance: number;
  categoryExpenseTransactions: TransactionDTO[];
  categoryIncomeTransactions: TransactionDTO[];
}

export interface Summary {
  incomes: string;
  expenses: string;
  balance: string;
  categoryExpenseTransactions: Transaction[];
  categoryIncomeTransactions: Transaction[];
}
