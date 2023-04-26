import date from 'core/date';
import { Account, Transfer, TransferDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';
import { DATE_FORMAT } from 'shared/constants';

export const mapTransfers = (transfers: TransferDTO[], accounts: Account[], showDecimals = false): Transfer[] => {
  return transfers.map((transfer) => {
    return mapTransfer(transfer, accounts, showDecimals);
  });
};

export const mapTransfer = (transfer: TransferDTO, accounts: Account[], showDecimals = false): Transfer => {
  const from = accounts.find(({ id }) => id === transfer.fromAccount)!;
  const to = accounts.find(({ id }) => id === transfer.toAccount)!;

  return {
    ...transfer,
    fromAccount: from,
    toAccount: to,
    createdAt: date(transfer.createdAt).format(DATE_FORMAT),
    amount: mapNumberToCurrencyString(transfer.amount, from.currencyIso, showDecimals),
  };
};
