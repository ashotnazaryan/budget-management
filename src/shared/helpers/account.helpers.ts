import { TFunction } from 'i18next';
import { CURRENCIES } from 'shared/constants';
import { Account, AccountDTO, IconType, Locale } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapAccounts = (accounts: AccountDTO[], locale: Locale['isoIntl'], showDecimals = false): Account[] => {
  return accounts.map((account) => {
    return mapAccount(account, locale, showDecimals);
  });
};

export const mapAccount = (account: AccountDTO, locale: Locale['isoIntl'], showDecimals = false): Account => {
  return {
    ...account,
    balance: mapNumberToCurrencyString(account.balance, account.currencyIso, locale, showDecimals),
    icon: IconType[account.icon],
    currencySymbol: CURRENCIES.find(({ iso }) => iso === account.currencyIso)?.symbol || '$'
  };
};

export const getAccountLabel = (accountId: Account['id'], accounts: Account[], t: TFunction): string => {
  const account = accounts.find(({ id }) => id === accountId);

  if (!account) {
    return '';
  }

  return account.nameKey ? t(account.nameKey) : account.name;
};
