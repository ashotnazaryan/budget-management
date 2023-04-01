import { Auth } from './auth';
import { Category, CategoryType } from './category';
import { StatusState } from './common';
import { IconType } from './icon';

export interface TransactionDTO {
  _id?: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  percentValue?: number;
  createdAt: Date;
  icon: string;
}

export interface Transaction {
  id?: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: string;
  percentValue?: string;
  createdAt: string;
  icon: IconType;
}

export interface TransactionState {
  transactions: Transaction[];
  status: StatusState;
}
