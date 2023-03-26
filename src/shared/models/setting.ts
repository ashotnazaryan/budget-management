export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH' | 'AMD';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia' | 'Armenian Dram';
  symbol: '$' | '€' | 'zł' | '₴' | '֏';
}

export interface SettingDTO {
  currency: Currency;
}

export interface Setting {
  currency: Currency;
}

export interface SettingState extends Setting {
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
