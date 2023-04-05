import { Account, AccountDTO } from './account';

export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

export interface SettingDTO {
  showDecimals: boolean;
  isDarkTheme: boolean;
  defaultCurrency: Currency;
  defaultAccount?: AccountDTO['_id'];
}

export interface Setting {
  showDecimals: boolean;
  isDarkTheme: boolean;
  defaultCurrency: Currency;
  defaultAccount?: Account['id'];
}
