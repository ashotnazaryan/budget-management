import { Category, CategoryType } from './category';

// TODO: distinguish Summary, SummaryDTO and SummaryState
export interface SummaryDTO {
  incomes: number;
  expenses: number;
  balance: number;
  transactions: TransactionDataDTO[];
  categoryTransactions: TransactionDataDTO[];
}

export interface SummaryState {
  incomes: number;
  expenses: number;
  balance: number;
  transactions: TransactionData[];
  categoryTransactions: TransactionData[];
}

export interface TransactionDataDTO {
  uuid: string;
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: Date;
}

export interface TransactionData {
  uuid: string;
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: string;
}
