import * as type from "./type";
import { PlatformType } from "../../../contracts/enum/PlatformType";

export const setLanguage = (langCode: string) => {
    return {
        langCode,
        type: type.LANGUAGE,
    }
}

export const toggleMenu = () => {
    return {
        type: type.TOGGLEMENU,
    }
}

export const setPlatform = (platform: PlatformType) => {
    return {
        platform,
        type: type.SETPLATFORM,
    }
}

export const toggleAltGlyphs = () => {
    return {
        type: type.TOGGLEALTGLYPHS,
    }
}

export const setFont = (font: string) => {
    return {
        font,
        type: type.SETFONT,
    }
}