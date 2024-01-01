import { COUNTRIES } from 'shared/constants';
import { InvoiceAmount, Invoice, InvoiceDTO, Locale, User, UserProfile } from 'shared/models';

export const calculateAmount = (rate = 1, salary = 0, vatIncluded = false, decimalPlaces = 2): InvoiceAmount => {
  const amount = salary * rate;
  const vat = vatIncluded ? (amount * 23) / 100 : 0;

  return {
    vatAmount: Number(vat.toFixed(decimalPlaces)),
    vatRate: 23,
    net: Number(amount.toFixed(decimalPlaces)),
    gross: Number((amount + vat).toFixed(decimalPlaces)),
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
    ...invoice
  };
};
