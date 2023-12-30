import date from 'core/date';
import { Account, Locale, Transfer, TransferDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransfers = (transfers: TransferDTO[], accounts: Account[], locale: Locale['isoIntl'], showDecimals = false): Transfer[] => {
  return transfers.map((transfer) => {
    return mapTransfer(transfer, accounts, locale, showDecimals);
  });
};

export const mapTransfer = (transfer: TransferDTO, accounts: Account[], locale: Locale['isoIntl'], showDecimals = false): Transfer => {
  const from = accounts.find(({ id }) => id === transfer.fromAccount)!;
  const to = accounts.find(({ id }) => id === transfer.toAccount)!;

  return {
    ...transfer,
    fromAccount: from,
    toAccount: to,
    createdAt: date(transfer.createdAt).format(),
    amount: mapNumberToCurrencyString(transfer.amount, from.currencyIso, locale, showDecimals),
  };
};
