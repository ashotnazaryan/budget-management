import { Account, AccountDTO, IconType } from 'shared/models';

export const mapAccounts = (categories: AccountDTO[]): Account[] => {
  return categories.map((account) => ({
    ...account,
    id: account._id,
    icon: IconType[account.icon]
  }));
};
