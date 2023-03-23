import { Transaction, TransactionDTO } from './transaction';

export interface SummaryDTO {
  incomes: number;
  expenses: number;
  balance: number;
  categoryTransactions: TransactionDTO[];
}

export interface SummaryState {
  incomes: number;
  expenses: number;
  balance: number;
  categoryTransactions: Transaction[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
