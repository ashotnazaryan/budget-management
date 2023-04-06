import { Account, AccountDTO } from './account';
import { Auth } from './auth';
import { Category, CategoryType } from './category';
import { IconType } from './icon';

export interface TransactionDTO {
  id: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: number;
  createdAt: Date;
  icon: string;
  accountId: AccountDTO['id'];
  accountName: AccountDTO['name'];
  accountIcon: AccountDTO['icon'];
  percentValue?: number;
}

export interface Transaction {
  id: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  amount: string;
  createdAt: string;
  icon: IconType;
  accountId: Account['id'];
  accountName: Account['name'];
  accountIcon: Account['icon'];
  percentValue?: string;
}
