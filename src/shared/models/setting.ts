import { Account, AccountDTO } from './account';
import { Currency, Period } from './common';
import { Locale } from './locale';

export interface SettingDTO {
  showDecimals: boolean;
  isDarkTheme: boolean;
  locale: Locale['iso'],
  defaultCurrency: Currency['iso'];
  defaultPeriod: Period;
  defaultAccount?: AccountDTO['id'];
}

export interface Setting {
  showDecimals: boolean;
  isDarkTheme: boolean;
  locale: Locale;
  defaultCurrency: Currency;
  defaultPeriod: Period;
  defaultAccount?: Account['id'];
}
