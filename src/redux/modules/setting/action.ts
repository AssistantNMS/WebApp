import { DARKMODE, LANGUAGE, TOGGLEMENU, SETPLATFORM } from "./type";
import { PlatformType } from "../../../contracts/enum/PlatformType";

export const setDarkMode = (isDark: boolean) => {
    return {
        isDark,
        type: DARKMODE,
    }
}

export const setLanguage = (langCode: string) => {
    return {
        langCode,
        type: LANGUAGE,
    }
}

export const toggleMenu = () => {
    return {
        type: TOGGLEMENU,
    }
}

export const setPlatform = (platform: PlatformType) => {
    return {
        platform,
        type: SETPLATFORM,
    }
}