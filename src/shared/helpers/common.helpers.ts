export const mapNumberToCurrencyString = (value: number, showDecimals = false): string => {
  if (value === null || value === undefined) {
    return showDecimals ? '0.00' : '0';
  }

  const decimals = showDecimals ? 2 : 0;
  const currencyString = value.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return currencyString;
};

export const isPositiveString = (value: string): boolean => {
  return parseInt(value) >= 0;
};
