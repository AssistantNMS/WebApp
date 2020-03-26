import { SettingReducerKey, CartReducerKey } from './cacheKey';

import { initialSettingState } from './modules/setting/index';
import { initialCartState } from './modules/cart/index';


export const loadStateFromLocalStorage = () => {
    let settingReducer = initialSettingState;
    let storedSettingReducer = localStorage.getItem(SettingReducerKey);
    if (storedSettingReducer && storedSettingReducer !== "undefined") {
        settingReducer = JSON.parse(storedSettingReducer || '{}');
    }

    let cartReducer = initialCartState;
    let storedCartReducer = localStorage.getItem(CartReducerKey);
    if (storedCartReducer && storedCartReducer !== "undefined") {
        cartReducer = JSON.parse(storedCartReducer || '{}');
    }

    let persistedState: any = {
        settingReducer,
        cartReducer
    }
    return persistedState;
}

export const saveStateToLocalStorage = (store: any) => {
    var currentSettingReducer = store.getState().settingReducer;
    var storedSettingReducer = JSON.parse(localStorage.getItem(SettingReducerKey) || '{}');
    if (storedSettingReducer == null
        || storedSettingReducer.isDark !== currentSettingReducer.isDark
        || storedSettingReducer.selectedLanguage !== currentSettingReducer.selectedLanguage) {
        localStorage.setItem(SettingReducerKey, JSON.stringify(currentSettingReducer))
    }

    var currentCartReducer = store.getState().cartReducer;
    var storedCartReducer = localStorage.getItem(CartReducerKey);
    if (storedCartReducer == null
        || storedCartReducer !== JSON.stringify(currentCartReducer?.cartItems || [])) {
        localStorage.setItem(CartReducerKey, JSON.stringify(currentCartReducer))
    }
}