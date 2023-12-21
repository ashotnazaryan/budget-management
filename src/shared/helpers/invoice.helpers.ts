import { Amount } from 'shared/models';

export const calculateAmount = (rate = 1, salary = 0, vatIncluded = false, decimalPlaces = 2): Amount => {
  const amount = salary * rate;
  const vat = vatIncluded ? (amount * 23) / 100 : 0;

  return {
    vatAmount: Number(vat.toFixed(decimalPlaces)),
    vatRate: 23,
    net: Number(amount.toFixed(decimalPlaces)),
    gross: Number((amount + vat).toFixed(decimalPlaces)),
  };
};
