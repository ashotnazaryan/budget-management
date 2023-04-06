import { CURRENCIES } from 'shared/constants';
import { Setting, SettingDTO } from 'shared/models';

export const mapSettings = (setting: SettingDTO): Setting => {
  const fullCurrency = CURRENCIES.find((currency) => currency.iso === setting.defaultCurrency) || CURRENCIES[0];

  return {
    ...setting,
    defaultCurrency: {
      iso: setting.defaultCurrency,
      name: fullCurrency.name,
      symbol: fullCurrency.symbol
    }
  };
};
