export const mapNumberToCurrencyString = (value: number, showDecimals = false): string => {
  if (value === null || value === undefined) {
    return showDecimals ? '0.00' : '0';
  }

  const decimals = showDecimals ? 2 : 0;
  const currencyString = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return currencyString;
};

export const isPositiveString = (value: string): boolean => {
  return parseInt(value) >= 0;
};
