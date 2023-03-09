import { Category, CategoryType } from './category';

export interface SummaryState {
  incomes: number;
  expenses: number;
  balance: number;
  transactions: TransactionData[];
  categoryTransactions: TransactionData[];
}

export interface TransactionData {
  uuid: string;
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: string;
}
