import dayjs from 'dayjs';
import { Account, Transfer, TransferDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransfers = (transfers: TransferDTO[], accounts: Account[], showDecimals = false): Transfer[] => {
  return transfers.map((transfer) => {
    const fromAccount = accounts.find(({ id }) => id === transfer.fromAccount)!;
    const toAccount = accounts.find(({ id }) => id === transfer.toAccount)!;

    return mapTransfer(transfer, fromAccount, toAccount, showDecimals);
  });
};

export const mapTransfer = (transfer: TransferDTO, from: Account, to: Account, showDecimals = false): Transfer => {
  return {
    ...transfer,
    fromAccount: from,
    toAccount: to,
    createdAt: dayjs(transfer.createdAt).format('MMM D, YYYY'), // TODO: move date format to shared constants
    amount: mapNumberToCurrencyString(transfer.amount, showDecimals),
  };
};
