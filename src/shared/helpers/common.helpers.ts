import { TFunction } from 'i18next';
import date from 'core/date';
import { CURRENCIES } from 'shared/constants';
import { Currency, DateRange, Locale, Period, Option, CountryCode, ManageMode, StatusState } from 'shared/models';

export const getDateRangeForPeriod = (period: Period): DateRange => {
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

export const mapLocaleIsoToCountryCode = (iso: Locale['iso']): CountryCode => {
  switch (iso) {
  case 'en':
    return 'gb';
  case 'ru':
    return 'ru';
  case 'pl':
    return 'pl';
  case 'ua':
    return 'ua';
  case 'am':
    return 'am';
  default:
    throw new Error(`Unsupported locale iso: ${iso}`);
  }
};

export const mapCurrencyIsoToCountryCode = (iso: Currency['iso']): CountryCode => {
  switch (iso) {
  case 'USD':
    return 'us';
  case 'EUR':
    return 'eu';
  case 'PLN':
    return 'pl';
  case 'UAH':
    return 'ua';
  default:
    throw new Error(`Unsupported currency iso: ${iso}`);
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
  default:
    throw new Error(`Unsupported currency: ${currency}`);
  }
};

export const mapNumberToCurrencyString = (value: number, currency: Currency['iso'], locale: Locale['isoIntl'], showDecimals = false): string => {
  const decimals = showDecimals ? 2 : 0;
  const currencyString = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currency,
    style: 'currency'
  });

  return currencyString;
};

export const mapCurrencyStringToNumber = (currencyString: string): number => {
  if (!currencyString) {
    return 0;
  }
  
  const cleanedValue = currencyString.replace(/[^0-9.,-]/g, '');
  const numberValue = parseFloat(cleanedValue.replace(',', ''));

  return numberValue;
};

export const mapCurrencyStringToLocaleString = (currencyString: string): string => {
  const cleanedString = currencyString.replace(/[^0-9.,-]/g, '').replace(',', '.');
  const numberValue = parseFloat(cleanedString);
  const formattedCurrency = numberValue.toLocaleString();

  return formattedCurrency;
};

export const mapCurrencyStringToInputString = (currencyString: string): string => {
  const numericString = currencyString.replace(/[^0-9.,-]/g, '');
  const normalizedString = numericString.replace(/,/g, '.');
  const hasCurrencySymbol = currencyString !== normalizedString;
  let result = normalizedString;

  if (hasCurrencySymbol) {
    const currencySymbolRegex = /[^0-9.,-]/g;
    const currencySymbolMatch = currencyString.match(currencySymbolRegex);
    const currencySymbol = currencySymbolMatch ? currencySymbolMatch.join('') : '';
    const symbolAtStart = currencyString.startsWith(currencySymbol);

    if (symbolAtStart) {
      result = normalizedString.replace(currencySymbol, '');
    }
  }

  return result.trim();
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

  return `fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`;
};

export const getPageTitle = <T extends { name: string, nameKey?: string }>(
  mode: ManageMode, t: TFunction, status: StatusState, translationNameSpace: string, newItemKey: string, emptyTitleKey: string, data?: T
): string => {
  if (status === 'loading') {
    return '';
  }

  if (mode === ManageMode.create) {
    return t(`${translationNameSpace}.${newItemKey}`);
  }

  if (data && (mode === ManageMode.edit || mode === ManageMode.view)) {
    return data?.nameKey ? t(data.nameKey) : (data?.name || '');
  }

  if ((status === 'succeeded' || status === 'failed') && !data) {
    return t(`${translationNameSpace}.${emptyTitleKey}`);
  }

  return '';
};
