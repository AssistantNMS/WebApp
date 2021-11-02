import i18next from 'i18next';

import { LocaleKey } from '../localization/LocaleKey';

interface IAvailableFontProps {
    title: string;
    value: string;
}

export const availableFonts = (): Array<IAvailableFontProps> => [
    {
        title: i18next.t(LocaleKey.defaultFont),
        value: LocaleKey.defaultFont.toString(),
    },
    {
        title: i18next.t(LocaleKey.nmsThemed),
        value: LocaleKey.nmsThemed.toString(),
    }
];