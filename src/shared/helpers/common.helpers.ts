export const mapNumberToCurrencyString = (value: number, showDecimals = false): string => {
  if (value === null || value === undefined) {
    return '0';
  }

  const decimals = showDecimals ? 2 : 0;

  return value.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const isPositiveString = (value: string): boolean => {
  return parseInt(value) >= 0;
};
