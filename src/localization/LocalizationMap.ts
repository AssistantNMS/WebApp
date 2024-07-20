import { LocaleKey } from './LocaleKey';

export class LocalizationMap {
  name: LocaleKey;
  code: string;
  countryCode: string;
  serverSideId: number;

  constructor(name: LocaleKey, code: string, countryCode: string, serverSideId: number) {
    this.name = name;
    this.code = code;
    this.countryCode = countryCode;
    this.serverSideId = serverSideId;
  }
}
