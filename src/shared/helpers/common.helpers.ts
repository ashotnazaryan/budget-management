import { TFunction } from 'i18next';
import { RadioOption } from 'shared/components/FormRadioGroup';
import { CURRENCIES } from 'shared/constants';
import { Currency } from 'shared/models';

export const mapNumberToCurrencyString = (value: number, showDecimals = false): string => {
  if (value === null || value === undefined) {
    return showDecimals ? '0.00' : '0';
  }

  const decimals = showDecimals ? 2 : 0;
  const currencyString = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return currencyString;
};

export const mapCurrencyStringToNumber = (value: string): number => {
  return Number(value.replace(/[^0-9.-]+/g, ''));
};

export const isPositiveString = (value: string): boolean => {
  return parseInt(value) >= 0;
};

export const getCurrencySymbolByIsoCode = (currencyIso: Currency['iso']): Currency['symbol'] => {
  return CURRENCIES.find(({ iso }) => iso === currencyIso)?.symbol || CURRENCIES[0].symbol;
};

export const mapCategoryTypesWithTranslations = (categoryTabs: RadioOption[], t: TFunction<'translation'>
): RadioOption[] => {
  return categoryTabs.map((categoryTab) => {
    return {
      ...categoryTab,
      label: t(categoryTab.label)
    };
  });
};
