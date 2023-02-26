export interface Currency {
  iso: 'USD' | 'EUR' | 'PLN' | 'UAH';
  name: 'US Dollar' | 'Euro' | 'Polish Zloty' | 'Ukrainian Hryvnia';
  symbol: '$' | '€' | 'zł' | '₴';
}

export interface CurrencyState {
  default: Currency;
}
