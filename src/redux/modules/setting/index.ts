import i18next from 'i18next';

import * as type from './type'
import { StateSettingReducer } from '../../state/StateSettingReducer';

const initialState: StateSettingReducer = {
    isDark: true,
    selectedLanguage: 'en',
    menuIsVisible: true
}

export const settingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case type.DARKMODE:
            return Object.assign({}, state, {
                isDark: action.isDark
            });
        case type.LANGUAGE:
            i18next.changeLanguage(action.langCode);
            return Object.assign({}, state, {
                selectedLanguage: action.langCode
            });
        case type.TOGGLEMENU:
            const htmlTag = document.querySelector('html');
            if (htmlTag != null) {
                htmlTag.classList.toggle('nav-open');
            }
            return Object.assign({}, state, {
                menuIsVisible: state.menuIsVisible
            });
        default:
            return state
    }
}
