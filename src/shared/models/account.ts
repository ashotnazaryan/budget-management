/* eslint-disable no-unused-vars */
import { ErrorResponse, StatusState } from './common';
import { IconType } from './icon';
import { Currency } from './setting';

export interface AccountDTO {
  _id: string;
  name: string;
  initialAmount: number;
  currencyIso: Currency['iso'];
  icon: IconType;
}

export interface Account {
  id: string;
  name: string;
  initialAmount: string;
  currencySymbol: Currency['symbol'];
  icon: IconType;
}

export interface AccountState {
  accounts: Account[];
  status: StatusState;
  error?: ErrorResponse;
}
