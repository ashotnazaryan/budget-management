import { CURRENCIES, LANGUAGES } from 'shared/constants';
import { Setting, SettingDTO } from 'shared/models';

export const mapSettings = (setting: SettingDTO): Setting => {
  const fullCurrency = CURRENCIES.find(({ iso }) => iso === setting.defaultCurrency) || CURRENCIES[0];
  const fullLanguage = LANGUAGES.find(({ iso }) => iso === setting.language) || LANGUAGES[0];

  return {
    ...setting,
    defaultCurrency: {
      iso: setting.defaultCurrency,
      name: fullCurrency.name,
      symbol: fullCurrency.symbol
    },
    language: {
      iso: setting.language,
      displayName: fullLanguage.displayName
    }
  };
};
