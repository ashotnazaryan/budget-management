import { Account, AccountDTO } from './account';

export interface TransferDTO {
  id: string;
  fromAccount: AccountDTO['id'];
  toAccount: AccountDTO['id'];
  amount: number;
  createdAt: Date;
}

export interface Transfer {
  id: string;
  fromAccount: Account;
  toAccount: Account;
  amount: string;
  createdAt: string;
}
