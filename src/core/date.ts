import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { Locale } from 'shared/models';
import { LOCALES } from 'shared/constants';

export interface LocalizedDate extends Dayjs {
  setLocale(locale?: Locale['iso']): Dayjs;
}

const date = (date?: dayjs.ConfigType): LocalizedDate => {
  dayjs.extend(customParseFormat);

  const instance = dayjs(date) as LocalizedDate;

  instance.setLocale = (locale?: Locale['iso']): Dayjs => {
    locale ? dayjs.locale(locale) : dayjs.locale(LOCALES[0].iso);

    return instance;
  };

  return instance;
};

export default date;
