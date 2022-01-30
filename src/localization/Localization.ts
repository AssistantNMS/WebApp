import { LocaleKey } from './LocaleKey';
import { LocalizationMap } from './LocalizationMap';

export const localeMap = [
  new LocalizationMap(LocaleKey.english, 'en', 'gb', 3),
  new LocalizationMap(LocaleKey.dutch, 'nl', 'nl', 2),
  new LocalizationMap(LocaleKey.french, 'fr', 'fr', 4),
  new LocalizationMap(LocaleKey.german, 'de', 'de', 5),
  new LocalizationMap(LocaleKey.italian, 'it', 'it', 6),
  new LocalizationMap(LocaleKey.indonesian, 'id', 'id', 21),
  new LocalizationMap(LocaleKey.brazilianPortuguese, 'pt-br', 'br', 1),
  new LocalizationMap(LocaleKey.polish, 'pl', 'pl', 10),
  new LocalizationMap(LocaleKey.portuguese, 'pt', 'pt', 11),
  new LocalizationMap(LocaleKey.romanian, 'ro', 'ro', 22),
  new LocalizationMap(LocaleKey.russian, 'ru', 'ru', 12),
  new LocalizationMap(LocaleKey.spanish, 'es', 'es', 14),
  new LocalizationMap(LocaleKey.czech, 'cs', 'cz', 16),
  new LocalizationMap(LocaleKey.turkish, 'tr', 'tr', 17),
  new LocalizationMap(LocaleKey.hungarian, 'hu', 'hu', 18),
  new LocalizationMap(LocaleKey.simplifiedChinese, 'zh-hans', 'cn', 13),
  new LocalizationMap(LocaleKey.traditionalChinese, 'zh-hant', 'cn', 15),
  new LocalizationMap(LocaleKey.norwegian, 'no', 'no', 16),
  new LocalizationMap(LocaleKey.afrikaans, 'af', 'za', 19),
];

export const supportedLanguages = localeMap.map((l) => l.name);
export const supportedLanguagesCodes = localeMap.map((l) => l.code);
