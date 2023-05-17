export interface Locale {
  iso: 'en' | 'ru' | 'ua' | 'pl' | 'am';
  isoIntl: Intl.LocalesArgument;
  displayName: string;
}

export type CountryCode = 'us' | 'gb' | 'ru' | 'ua' | 'pl' | 'am' | 'eu';
