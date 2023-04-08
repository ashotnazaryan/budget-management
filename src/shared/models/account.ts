import { IconType } from './icon';
import { Currency } from './setting';

export interface AccountDTO {
  id: string;
  name: string;
  balance: number;
  currencyIso: Currency['iso'];
  icon: IconType;
  isDefaultAccount?: boolean;
}

export interface Account {
  id: string;
  name: string;
  balance: string;
  currencyIso: Currency['iso'];
  currencySymbol: Currency['symbol'];
  icon: IconType;
  isDefaultAccount?: boolean;
}
