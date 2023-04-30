import { TFunction } from 'i18next';
import date from 'core/date';
import { CURRENCIES } from 'shared/constants';
import { Currency, DateRange, Period } from 'shared/models';
import { RadioOption } from 'shared/components/FormRadioGroup';

const getDateRangeForPeriod = (period: Period): DateRange => {
  const now = date();

  switch (period) {
  case Period.day:
    return {
      fromDate: now.startOf('day'),
      toDate: now.endOf('day'),
    };

  case Period.week:
    return {
      fromDate: now.startOf('week'),
      toDate: now.endOf('week'),
    };

  case Period.month:
    return {
      fromDate: now.startOf('month'),
      toDate: now.endOf('month'),
    };

  case Period.year:
    return {
      fromDate: now.startOf('year'),
      toDate: now.endOf('year'),
    };

  case Period.allTime:
    return {
      fromDate: date(new Date(0)),
      toDate: now,
    };

  default:
    return {
      fromDate: date(new Date(0)),
      toDate: now,
    };
  }
};

export const mapNumberToCurrencyString = (value: number, currency: Currency['iso'], showDecimals = false): string => {
  if (value === null || value === undefined) {
    return showDecimals ? '0.00' : '0';
  }

  const decimals = showDecimals ? 2 : 0;
  const currencyString = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currency,
    style: 'currency'
  });

  return currencyString;
};

export const mapCurrencyStringToNumber = (value: string): number => {
  return Number(value.replace(/[^0-9.-]+/g, ''));
};

export const mapCurrencyStringToInputString = (value: string): string => {
  return value.replace(/[^0-9.-]+/g, '');
};

export const isPositiveString = (value: string): boolean => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) >= 0;
};

export const getCurrencySymbolByIsoCode = (currencyIso: Currency['iso']): Currency['symbol'] => {
  return CURRENCIES.find(({ iso }) => iso === currencyIso)?.symbol || CURRENCIES[0].symbol;
};

export const mapCategoryTypesWithTranslations = (categoryTabs: RadioOption[], t: TFunction): RadioOption[] => {
  return categoryTabs.map((categoryTab) => {
    return {
      ...categoryTab,
      label: t(categoryTab.label)
    };
  });
};

export const getQueryParamByPeriod = (period: Period): string => {
  const { fromDate, toDate } = getDateRangeForPeriod(period);

  return `?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`;
};
