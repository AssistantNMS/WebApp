import { PlatformType } from "../../contracts/enum/PlatformType";

export class StateSettingReducer {
    public selectedLanguage!: string;
    public menuIsVisible!: boolean;
    public chosenPlatform!: PlatformType;
    public useAltGlyphs!: boolean;
}
