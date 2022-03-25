import State from "../../state";
import { ControllerPlatformType } from "../../../contracts/enum/ControllerPlatformType";
import { LocaleKey } from "../../../localization/LocaleKey";

export const getUseAltGlyphs = (state: State): boolean => state?.settingReducer?.useAltGlyphs != null ? state.settingReducer.useAltGlyphs : true;
export const getCurrentLanguage = (state: State): string => state?.settingReducer?.selectedLanguage || 'en';
export const getMenuVisibility = (state: State): boolean => state?.settingReducer?.menuIsVisible || false;
export const getChosenPlatform = (state: State): ControllerPlatformType => state?.settingReducer?.chosenPlatform || ControllerPlatformType.WIN;
export const getSelectedFont = (state: State): string => state?.settingReducer?.selectedFont || LocaleKey.defaultFont.toString();
export const getPlayerName = (state: State): string => state?.settingReducer?.playerName;