/* eslint-disable no-unused-vars */
import { ErrorResponse, StatusState } from './common';
import { IconType } from './icon';

export interface AccountDTO {
  _id: string;
  name: string;
  initialAmount: number;
  icon: IconType;
}

export interface Account {
  id: string;
  name: string;
  initialAmount: string;
  icon: IconType;
}

export interface AccountState {
  accounts: Account[];
  status: StatusState;
  error?: ErrorResponse;
}
