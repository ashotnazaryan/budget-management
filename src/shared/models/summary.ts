import { Transaction, TransactionDTO } from './transaction';

export interface SummaryDTO {
  incomes: number;
  expenses: number;
  profit: number;
  balance: number;
  categoryExpenseTransactions: TransactionDTO[];
  categoryIncomeTransactions: TransactionDTO[];
}

export interface Summary {
  incomes: string;
  expenses: string;
  profit: string;
  balance: string;
  categoryExpenseTransactions: Transaction[];
  categoryIncomeTransactions: Transaction[];
}
