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
  fromAccount: Account['id'];
  toAccount: Account['id'];
  amount: string;
  createdAt: string;
}
