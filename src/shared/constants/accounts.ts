import { Account, IconType } from 'shared/models';

export const ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Wallet',
    icon: IconType.wallet,
    currencySymbol: '$',
    currencyIso: 'USD',
    initialAmount: '0',
    isDefaultAccount: true
  }
];
