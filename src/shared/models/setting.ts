import { Account, AccountDTO } from './account';
import { Language } from './language';

export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

export interface SettingDTO {
  showDecimals: boolean;
  isDarkTheme: boolean;
  language: Language['iso'],
  defaultCurrency: Currency['iso'];
  defaultAccount?: AccountDTO['id'];
}

export interface Setting {
  showDecimals: boolean;
  isDarkTheme: boolean;
  language: Language;
  defaultCurrency: Currency;
  defaultAccount?: Account['id'];
}
