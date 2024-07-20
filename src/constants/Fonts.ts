import { translate } from '../localization/Translate';

import { LocaleKey } from '../localization/LocaleKey';

interface IAvailableFontProps {
  title: string;
  value: string;
}

export const availableFonts = (): Array<IAvailableFontProps> => [
  {
    title: translate(LocaleKey.defaultFont),
    value: LocaleKey.defaultFont.toString(),
  },
  {
    title: translate(LocaleKey.nmsThemed),
    value: LocaleKey.nmsThemed.toString(),
  },
];
