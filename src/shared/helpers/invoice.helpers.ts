import date from 'core/date';
import { COUNTRIES } from 'shared/constants';
import { InvoiceAmount, Invoice, InvoiceDTO, Locale, User, UserProfile, Currency, InvoiceAmountDTO } from 'shared/models';
import { mapCurrencyStringToNumber, mapCurrencyToLocaleString, mapNumberToCurrencyString } from './common.helpers';

export const calculateAmount = (currencyIso: Currency['iso'], rate = 1, salary = 0, vatIncluded = false, decimalPlaces = 2): InvoiceAmount => {
  const amount = salary * rate;
  const vat = vatIncluded ? (amount * 23) / 100 : 0;

  return {
    currencyIso,
    vatAmount: vat.toFixed(decimalPlaces),
    vatRate: 23,
    net: amount.toFixed(decimalPlaces),
    gross: (amount + vat).toFixed(decimalPlaces)
  };
};

export const mapUserProfileToInvoice = (user: User, profile: UserProfile): Partial<Invoice> => {
  if (!user || !profile) {
    return {};
  }

  const country = COUNTRIES.find(({ code }) => code === profile.countryCode)?.name || '';

  const sellerAddress = profile.streetAddress && profile.streetAddressLine
    ? `${profile.streetAddress}, ${profile.streetAddressLine}`
    : '';

  const sellerLocation = profile.zipCode && profile.city && country
    ? `${profile.zipCode} ${profile.city}, ${country}`
    : '';

  return {
    sellerName: user.fullName || '',
    sellerAddress,
    sellerLocation,
    sellerVatID: profile.taxId || '',
    sellerAccount: profile.accountNumber || ''
  };
};

export const mapInvoices = (invoices: InvoiceDTO[], locale: Locale['isoIntl'], showDecimals = false): Invoice[] => {
  return invoices.map((invoice) => {
    return mapInvoice(invoice, locale, showDecimals);
  });
};

export const mapInvoice = (invoice: InvoiceDTO, locale: Locale['isoIntl'], showDecimals = false): Invoice => {
  return {
    ...invoice,
    createdAt: date(invoice.createdAt).format(),
    amount: {
      ...invoice.amount,
      gross: mapNumberToCurrencyString(invoice.amount.gross, invoice.amount.currencyIso, locale, showDecimals),
      net: mapNumberToCurrencyString(invoice.amount.net, invoice.amount.currencyIso, locale, showDecimals),
      vatAmount: mapNumberToCurrencyString(invoice.amount.vatAmount, invoice.amount.currencyIso, locale, showDecimals)
    }
  };
};

export const mapInvoiceDTO = (invoice: Invoice): InvoiceDTO => {
  return {
    ...invoice,
    month: Number(invoice.month),
    createdAt: date(invoice.createdAt).toDate(),
    amount: {
      ...invoice.amount,
      gross: mapCurrencyStringToNumber(invoice.amount.gross),
      net: mapCurrencyStringToNumber(invoice.amount.net),
      vatAmount: mapCurrencyStringToNumber(invoice.amount.vatAmount)
    }
  };
};

export const mapInvoiceAmountDTO = (amount: InvoiceAmount): InvoiceAmountDTO => {
  return {
    ...amount,
    gross: mapCurrencyStringToNumber(amount.gross),
    net: mapCurrencyStringToNumber(amount.net),
    vatAmount: mapCurrencyStringToNumber(amount.vatAmount)
  };
};

export const mapInvoiceAmountToLocaleString = (amount: InvoiceAmount): InvoiceAmount => {
  if (!amount?.gross || !amount.net || !amount.currencyIso) {
    return {} as InvoiceAmount;
  }

  return {
    ...amount,
    gross: mapCurrencyToLocaleString(amount.gross),
    net: mapCurrencyToLocaleString(amount.net),
    vatAmount: mapCurrencyToLocaleString(amount.vatAmount)
  };
};
