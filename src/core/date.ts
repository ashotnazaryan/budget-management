import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/pl';
import { Locale } from 'shared/models';
import { LOCALES } from 'shared/constants';

export interface LocalizedDate extends Dayjs {
  setLocale(locale?: Locale['iso']): Dayjs;
}

const date = (date?: dayjs.ConfigType): LocalizedDate => {
  dayjs.extend(localizedFormat);

  const instance = dayjs(date) as LocalizedDate;

  instance.setLocale = (locale?: Locale['iso']): Dayjs => {
    locale ? dayjs.locale(locale) : dayjs.locale(LOCALES[0].iso);

    return instance;
  };

  return instance;
};

export default date;
