import dayjs from 'dayjs';
import { Transfer, TransferDTO } from 'shared/models';
import { mapNumberToCurrencyString } from './common.helpers';

export const mapTransfers = (transfers: TransferDTO[], showDecimals = false): Transfer[] => {
  return transfers.map((transfer) => {
    return mapTransfer(transfer, showDecimals);
  });
};

export const mapTransfer = (transfer: TransferDTO, showDecimals = false): Transfer => {
  return {
    ...transfer,
    createdAt: dayjs(transfer.createdAt).format('MMM D, YYYY'), // TODO: move date format to shared constants
    amount: mapNumberToCurrencyString(transfer.amount, showDecimals),
  };
};
