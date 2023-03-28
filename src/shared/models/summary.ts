import { Transaction, TransactionDTO } from './transaction';

export interface SummaryDTO {
  incomes: number;
  expenses: number;
  balance: number;
  categoryExpenseTransactions: TransactionDTO[];
}

export interface Summary {
  incomes: string;
  expenses: string;
  balance: string;
  categoryExpenseTransactions: Transaction[];
}

export interface SummaryState extends Summary {
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
