import { Account, AccountDTO, IconType } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapAccounts = (accounts: AccountDTO[], showDecimals = false): Account[] => {
  return accounts.map((account) => ({
    ...account,
    id: account._id,
    initialAmount: mapNumberToCurrencyString(account.initialAmount, showDecimals),
    icon: IconType[account.icon]
  }));
};
