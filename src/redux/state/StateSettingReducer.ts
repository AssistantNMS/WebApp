import { PlatformType } from "../../contracts/enum/PlatformType";

export class StateSettingReducer {
    public isDark!: boolean;
    public selectedLanguage!: string;
    public menuIsVisible!: boolean;
    public chosenPlatform!: PlatformType;
}
