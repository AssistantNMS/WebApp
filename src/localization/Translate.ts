import i18next from "i18next"
import { LocaleKey } from "./LocaleKey"

export const translate = (localeKey: LocaleKey | string): string => {
    return i18next.t(localeKey);
}

export const getCurrentLang = () => i18next.language;

export const changeLanguage = (langCode: string) => //
    i18next.changeLanguage(langCode);