import State from "../../state";
import { PlatformType } from "../../../contracts/enum/PlatformType";

export const getIsDark = (state: State): boolean => state?.settingReducer?.isDark || true;
export const getCurrentLanguage = (state: State): string => state?.settingReducer?.selectedLanguage || 'en';
export const getMenuVisibility = (state: State): boolean => state?.settingReducer?.menuIsVisible || false;
export const getChosenPlatform = (state: State): PlatformType => state?.settingReducer?.chosenPlatform || PlatformType.PC;