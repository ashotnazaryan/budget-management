import { COUNTRIES } from 'shared/constants';
import { Amount, Invoice, User, UserProfile } from 'shared/models';

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

export const mapUserProfileToInvoice = (user: User, profile: UserProfile): Partial<Invoice> => {
  if (!user || !profile) {
    return {};
  }

  const country = COUNTRIES.find(({ code }) => code === profile.countryCode)?.name || '';

  return {
    sellerName: user.fullName,
    sellerAddress: `${profile.streetAddress}, ${profile.streetAddressLine}`,
    sellerLocation: `${profile.zipCode} ${profile.city}, ${country}`,
    sellerVatID: profile.taxId,
    sellerAccount: profile.accountNumber
  };
};
