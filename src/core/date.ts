import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { Language } from 'shared/models';

interface LocalizedDate extends Dayjs {
  setLocale(locale: Language['iso']): Dayjs;
}

const date = (date?: dayjs.ConfigType): LocalizedDate => {
  const instance = dayjs(date) as LocalizedDate;

  instance.setLocale = (locale: Language['iso']): Dayjs => {
    dayjs.locale(locale);

    return instance;
  };

  return instance;
};

export default date;
