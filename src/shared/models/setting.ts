import { Account, AccountDTO } from './account';
import { Period } from './common';
import { Locale } from './locale';

export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  nameKey: 'CURRENCIES.USD' | 'CURRENCIES.EUR' | 'CURRENCIES.PLN' | 'CURRENCIES.UAH' | 'CURRENCIES.AMD';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

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
