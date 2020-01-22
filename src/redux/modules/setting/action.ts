import { DARKMODE, LANGUAGE, TOGGLEMENU } from "./type";

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