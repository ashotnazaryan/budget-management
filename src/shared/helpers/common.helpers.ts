import { TFunction } from 'i18next';
import date from 'core/date';
import { CURRENCIES } from 'shared/constants';
import { Currency, DateRange, Locale, Period, Option } from 'shared/models';

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

export const mapLocaleToDateLocale = (locale: Locale['iso']): string => {
  switch (locale) {
  case 'en':
    return 'en';
  case 'ru':
    return 'ru';
  case 'pl':
    return 'pl';
  case 'ua':
    return 'uk';
  case 'am':
    return 'hy-am';
  default:
    return 'en';
  }
};

export const mapCurrencyToLocale = (currency: Currency['iso']): Locale['isoIntl'] => {
  switch (currency) {
  case 'USD':
    return 'en-US';
  case 'EUR':
    return 'fr-FR';
  case 'UAH':
    return 'uk-UA';
  case 'PLN':
    return 'pl-PL';
  case 'AMD':
    return 'hy-AM';
  default:
    throw new Error(`Unsupported currency: ${currency}`);
  }
};

export const mapNumberToCurrencyString = (value: number, currency: Currency['iso'], showDecimals = false): string => {
  const decimals = showDecimals ? 2 : 0;
  const locale = mapCurrencyToLocale(currency);
  const currencyString = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currency,
    style: 'currency'
  });

  return currencyString;
};

export const mapCurrencyStringToNumber = (value: string): number => {
  const cleanedValue = value.replace(/[^0-9.,-]/g, '').replace(',', '.');

  return parseFloat(cleanedValue);
};

export const mapCurrencyStringToInputString = (value: string): string => {
  return value.replace(/[^0-9.,-]/g, '').replace(',', '.');
};

export const isPositiveString = (value: string): boolean => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) >= 0;
};

export const getCurrencySymbolByIsoCode = (currencyIso: Currency['iso']): Currency['symbol'] => {
  return CURRENCIES.find(({ iso }) => iso === currencyIso)?.symbol || CURRENCIES[0].symbol;
};

export const mapCategoryTypesWithTranslations = (categoryTabs: Option[], t: TFunction): Option[] => {
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
