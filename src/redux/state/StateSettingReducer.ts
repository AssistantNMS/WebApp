import { ControllerPlatformType } from "../../contracts/enum/ControllerPlatformType";

export class StateSettingReducer {
    public selectedLanguage!: string;
    public menuIsVisible!: boolean;
    public chosenPlatform!: ControllerPlatformType;
    public useAltGlyphs!: boolean;
    public selectedFont!: string;
}
