import { LocalizationMap } from './LocalizationMap';

export const localeMap = [
  new LocalizationMap('English', 'en'),
  new LocalizationMap('Afrikaans', 'af'),
  new LocalizationMap('Dutch', 'nl'),
  new LocalizationMap('French', 'fr'),
  new LocalizationMap('German', 'de'),
  new LocalizationMap('Italian', 'it'),
  new LocalizationMap('Portuguese', 'pt'),
  new LocalizationMap('Brazilian Portuguese', 'ptbr'),
  new LocalizationMap('Russian', 'ru'),
  new LocalizationMap('Spanish', 'es'),
  new LocalizationMap('Hungarian', 'hu')
];

export const supportedLanguages = localeMap.map((l) => l.name);
export const supportedLanguagesCodes = localeMap.map((l) => l.code);
