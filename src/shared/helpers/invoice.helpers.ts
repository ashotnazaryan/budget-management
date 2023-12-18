import { Amount } from 'shared/models';

export const calculateAmount = (rate = 1, salary = 0, vatIncluded = false): Amount => {
  const amount = salary * rate;
  const vat = vatIncluded ? (amount * 23) / 100 : 0;

  return {
    vatAmount: vat.toFixed(2),
    vatRate: '23%',
    net: amount.toFixed(2),
    gross: (amount + vat).toFixed(2),
  };
};
