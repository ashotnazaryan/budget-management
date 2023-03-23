import { AuthState } from './auth';
import { Category, CategoryType } from './category';

export interface TransactionState {
  transactions: Transaction[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface TransactionDTO {
  _id?: string;
  userId: AuthState['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: Date;
}

export interface Transaction {
  id?: string;
  userId: AuthState['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: string;
}
