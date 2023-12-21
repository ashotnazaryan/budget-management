import { Currency } from 'shared/models';

export const CURRENCIES: Currency[] = [
  {
    iso: 'USD',
    name: 'US Dollar',
    nameKey: 'CURRENCIES.USD',
    symbol: '$'
  },
  {
    iso: 'EUR',
    name: 'Euro',
    nameKey: 'CURRENCIES.EUR',
    symbol: '€'
  },
  {
    iso: 'PLN',
    name: 'Polish Zloty',
    nameKey: 'CURRENCIES.PLN',
    symbol: 'zł'
  },
  {
    iso: 'UAH',
    name: 'Ukrainian Hryvnia',
    nameKey: 'CURRENCIES.UAH',
    symbol: '₴'
  },
  {
    iso: 'AMD',
    name: 'Armenian Dram',
    nameKey: 'CURRENCIES.AMD',
    symbol: '֏'
  }
];

export const INVOICE_CURRENCIES: Currency[] = CURRENCIES.filter(({ iso }) => iso !== 'AMD');
