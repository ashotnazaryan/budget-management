import { Category, CategoryType } from './category';

export interface SummaryState {
  incomes: number;
  expenses: number;
  balance: number;
  transactions: TransactionData[];
}

export interface TransactionData {
  id: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
}
