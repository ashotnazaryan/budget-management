/* eslint-disable no-unused-vars */
import { IconType } from './icon';

export interface AccountDTO {
  _id: string;
  name: string;
  id: string;
  icon: IconType;
}

export interface Account {
  id: string;
  name: string;
  icon: IconType;
}

export interface AccountState  {
  accounts: Account[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
