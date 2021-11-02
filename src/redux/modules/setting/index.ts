import * as type from './type';
import i18next from 'i18next';

import { PlatformType } from '../../../contracts/enum/PlatformType';
import { StateSettingReducer } from '../../state/StateSettingReducer';
import { LocaleKey } from '../../../localization/LocaleKey';
import { toggleHtmlNodeClass } from '../../../helper/documentHelper';

export const initialSettingState: StateSettingReducer = {
    selectedLanguage: 'en',
    menuIsVisible: false,
    chosenPlatform: PlatformType.PC,
    useAltGlyphs: true,
    selectedFont: LocaleKey.defaultFont.toString(),
}

export const settingReducer = (state = initialSettingState, action: any) => {
    switch (action.type) {
        case type.LANGUAGE:
            i18next.changeLanguage(action.langCode);
            return Object.assign({}, state, {
                selectedLanguage: action.langCode
            });
        case type.TOGGLEMENU:
            const menuIsVisible = toggleHtmlNodeClass('html', 'nav-open');
            return Object.assign({}, state, {
                menuIsVisible: menuIsVisible,
            });
        case type.SETPLATFORM:
            return Object.assign({}, state, {
                chosenPlatform: action.platform
            });
        case type.TOGGLEALTGLYPHS:
            return Object.assign({}, state, {
                useAltGlyphs: !state.useAltGlyphs
            });
        case type.SETFONT:
            return Object.assign({}, state, {
                selectedFont: action.font
            });
        default:
            return state
    }
}
