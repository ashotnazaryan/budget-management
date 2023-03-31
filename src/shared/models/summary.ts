import { Transaction, TransactionDTO } from './transaction';
import { StatusState } from './common';

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

export interface SummaryState extends Summary {
  status: StatusState;
}
