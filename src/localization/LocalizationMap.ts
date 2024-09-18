import { LocaleKey } from './LocaleKey';

export class LocalizationMap {
  name: LocaleKey;
  code: string;
  countryCode: string;

  constructor(name: LocaleKey, code: string, countryCode: string) {
    this.name = name;
    this.code = code;
    this.countryCode = countryCode;
  }
}
