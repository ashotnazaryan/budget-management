import { IconType } from './icon';
import { Currency } from './setting';

export interface AccountDTO {
  _id: string;
  name: string;
  initialAmount: number;
  currencyIso: Currency['iso'];
  icon: IconType;
  isDefaultAccount?: boolean;
}

export interface Account {
  id: string;
  name: string;
  initialAmount: string;
  currencyIso: Currency['iso'];
  currencySymbol: Currency['symbol'];
  icon: IconType;
  isDefaultAccount?: boolean;
}
