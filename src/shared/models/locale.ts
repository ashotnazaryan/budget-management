export interface Locale {
  iso: 'en' | 'pl' | 'ru' | 'ua' | 'am';
  isoIntl: Intl.LocalesArgument;
  displayName: string;
}

export type CountryCode = 'us' | 'gb' | 'eu' | 'pl' | 'ru' | 'ua' | 'am';
