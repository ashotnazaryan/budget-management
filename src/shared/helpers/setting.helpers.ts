import { CURRENCIES, LOCALES } from 'shared/constants';
import { Setting, SettingDTO } from 'shared/models';

export const mapSettings = (setting: SettingDTO): Setting => {
  const fullCurrency = CURRENCIES.find(({ iso }) => iso === setting.defaultCurrency) || CURRENCIES[0];
  const fullLocale = LOCALES.find(({ iso }) => iso === setting.locale) || LOCALES[0];

  return {
    ...setting,
    defaultCurrency: {
      iso: setting.defaultCurrency,
      name: fullCurrency.name,
      symbol: fullCurrency.symbol
    },
    locale: {
      iso: setting.locale,
      displayName: fullLocale.displayName
    }
  };
};
