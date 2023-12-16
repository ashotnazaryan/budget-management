import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/pl';
import 'dayjs/locale/uk';
import 'dayjs/locale/hy-am';
import { Locale } from 'shared/models';
import { LOCALES } from 'shared/constants';
import { mapLocaleToDateLocale } from 'shared/helpers';

export interface LocalizedDate extends Dayjs {
  setLocale(locale?: Locale['iso']): Dayjs;
}

const date = (date?: dayjs.ConfigType): LocalizedDate => {
  dayjs.extend(localizedFormat);

  const instance = dayjs(date) as LocalizedDate;

  instance.setLocale = (locale?: Locale['iso']): Dayjs => {
    locale ? dayjs.locale(mapLocaleToDateLocale(locale)) : dayjs.locale(LOCALES[0].iso);

    return instance;
  };

  return instance;
};

export default date;
