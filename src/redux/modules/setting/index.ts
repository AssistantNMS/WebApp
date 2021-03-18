import * as type from './type';
import i18next from 'i18next';

import { PlatformType } from '../../../contracts/enum/PlatformType';
import { StateSettingReducer } from '../../state/StateSettingReducer';

export const initialSettingState: StateSettingReducer = {
    selectedLanguage: 'en',
    menuIsVisible: false,
    chosenPlatform: PlatformType.PC,
    useAltGlyphs: true,
}

export const settingReducer = (state = initialSettingState, action: any) => {
    switch (action.type) {
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
        case type.TOGGLEALTGLYPHS:
            return Object.assign({}, state, {
                useAltGlyphs: !state.useAltGlyphs
            });
        default:
            return state
    }
}
