import * as type from './type';
import i18next from 'i18next';

import { PlatformType } from '../../../contracts/enum/PlatformType';
import { StateSettingReducer } from '../../state/StateSettingReducer';
import { applyIsDarkToBody } from '../../../helper/bodyHelper';

export const initialSettingState: StateSettingReducer = {
    isDark: true,
    selectedLanguage: 'en',
    menuIsVisible: false,
    chosenPlatform: PlatformType.PC,
}

export const settingReducer = (state = initialSettingState, action: any) => {
    switch (action.type) {
        case type.DARKMODE:
            applyIsDarkToBody(action.isDark);
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
                menuIsVisible: htmlTag?.classList?.contains('nav-open') ?? false
            });
        case type.SETPLATFORM:
            return Object.assign({}, state, {
                chosenPlatform: action.platform
            });
        default:
            return state
    }
}
