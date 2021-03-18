import State from "../../state";
import { PlatformType } from "../../../contracts/enum/PlatformType";

export const getUseAltGlyphs = (state: State): boolean => state?.settingReducer?.useAltGlyphs != null ? state.settingReducer.useAltGlyphs : true;
export const getCurrentLanguage = (state: State): string => state?.settingReducer?.selectedLanguage || 'en';
export const getMenuVisibility = (state: State): boolean => state?.settingReducer?.menuIsVisible || false;
export const getChosenPlatform = (state: State): PlatformType => state?.settingReducer?.chosenPlatform || PlatformType.PC;