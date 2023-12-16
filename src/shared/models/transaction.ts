import { Account, AccountDTO } from './account';
import { Auth } from './auth';
import { Category, CategoryType } from './category';
import { IconType } from './icon';
import { Currency } from './common';

export interface TransactionDTO {
  id: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  nameKey?: string;
  amount: number;
  currencyIso: Currency['iso'];
  createdAt: Date;
  icon: string;
  accountId: AccountDTO['id'];
  accountName: AccountDTO['name'];
  accountNameKey: AccountDTO['nameKey'];
  accountIcon: AccountDTO['icon'];
  percentValue?: number;
  note?: string;
}

export interface Transaction {
  id: string;
  userId: Auth['userId'];
  categoryId: Category['id'];
  type: CategoryType;
  name: Category['name'];
  nameKey?: string;
  amount: string;
  currencyIso: Currency['iso'];
  createdAt: string;
  icon: IconType;
  accountId: Account['id'];
  accountName: Account['name'];
  accountNameKey: AccountDTO['nameKey'];
  accountIcon: Account['icon'];
  percentValue?: string;
  note?: string;
}
