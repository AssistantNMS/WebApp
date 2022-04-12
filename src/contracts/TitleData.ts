import { LocaleKey } from "../localization/LocaleKey";

export interface TitleData {
    Id: string;
    Title: string;
    Description: string;
    AppId: string;
    AppIcon: string;
    AppName: string;
    UnlockedByStatLocaleKey: LocaleKey;
    UnlockedByStatValue: number;
}