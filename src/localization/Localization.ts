import { LocaleKey } from './LocaleKey';
import { LocalizationMap } from './LocalizationMap';

export const localeMap = [
  new LocalizationMap(LocaleKey.english, 'en', 'gb'),
  new LocalizationMap(LocaleKey.dutch, 'nl', 'nl'),
  new LocalizationMap(LocaleKey.french, 'fr', 'fr'),
  new LocalizationMap(LocaleKey.german, 'de', 'de'),
  new LocalizationMap(LocaleKey.italian, 'it', 'it'),
  new LocalizationMap(LocaleKey.indonesian, 'id', 'id'),
  new LocalizationMap(LocaleKey.brazilianPortuguese, 'pt-br', 'br'),
  new LocalizationMap(LocaleKey.polish, 'pl', 'pl'),
  new LocalizationMap(LocaleKey.portuguese, 'pt', 'pt'),
  new LocalizationMap(LocaleKey.romanian, 'ro', 'ro'),
  new LocalizationMap(LocaleKey.russian, 'ru', 'ru'),
  new LocalizationMap(LocaleKey.spanish, 'es', 'es'),
  new LocalizationMap(LocaleKey.czech, 'cs', 'cz'),
  new LocalizationMap(LocaleKey.turkish, 'tr', 'tr'),
  new LocalizationMap(LocaleKey.hungarian, 'hu', 'hu'),
  new LocalizationMap(LocaleKey.simplifiedChinese, 'zh-hans', 'cn'),
  new LocalizationMap(LocaleKey.traditionalChinese, 'zh-hant', 'cn'),
  new LocalizationMap(LocaleKey.arabic, 'ar', 'ae'),
  new LocalizationMap(LocaleKey.vietnamese, 'vi-vn', 'vn'),
  new LocalizationMap(LocaleKey.urdu, 'ur', 'pk'),
  new LocalizationMap(LocaleKey.filipino, 'ph', 'ph'),
  new LocalizationMap(LocaleKey.malaysian, 'ms', 'my'),
  new LocalizationMap(LocaleKey.tagalog, 'tl', 'ph'),
  new LocalizationMap(LocaleKey.japanese, 'ja', 'jp'),
  new LocalizationMap(LocaleKey.ukrainian, 'uk', 'ua'),
  new LocalizationMap(LocaleKey.korean, 'kr', 'kr'),
  new LocalizationMap(LocaleKey.norwegian, 'no', 'no'),
  new LocalizationMap(LocaleKey.afrikaans, 'af', 'za'),
];

export const supportedLanguages = localeMap.map((l) => l.name);
export const supportedLanguagesCodes = localeMap.map((l) => l.code);
