import { StatusState } from './common';

export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

export interface SettingDTO {
  currency: Currency;
  showDecimals: boolean;
}

export interface Setting {
  currency: Currency;
  showDecimals: boolean;
}

export interface SettingState extends Setting {
  status: StatusState;
}
