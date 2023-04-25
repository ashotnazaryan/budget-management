import dayjs from 'dayjs';
import { Account, Transfer, TransferDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

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
    createdAt: dayjs(transfer.createdAt).format('MMM D, YYYY'), // TODO: move date format to shared constants
    amount: mapNumberToCurrencyString(transfer.amount, showDecimals),
  };
};
