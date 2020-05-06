import * as CacheKey from './cacheKey';

import { initialSettingState } from './modules/setting/index';
import { initialCartState } from './modules/cart/index';
import { initialFavouriteState } from './modules/favourite';


export const loadStateFromLocalStorage = () => {
    let settingReducer = initialSettingState;
    let storedSettingReducer = localStorage.getItem(CacheKey.SettingReducerKey);
    if (storedSettingReducer && storedSettingReducer !== "undefined") {
        settingReducer = JSON.parse(storedSettingReducer || '{}');
    }

    let cartReducer = initialCartState;
    let storedCartReducer = localStorage.getItem(CacheKey.CartReducerKey);
    if (storedCartReducer && storedCartReducer !== "undefined") {
        cartReducer = JSON.parse(storedCartReducer || '{}');
    }

    let favouriteReducer = initialFavouriteState;
    let storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
    if (storedFavouriteReducer && storedFavouriteReducer !== "undefined") {
        favouriteReducer = JSON.parse(storedFavouriteReducer || '{}');
    }

    let persistedState: any = {
        settingReducer,
        cartReducer,
        favouriteReducer
    }
    return persistedState;
}

export const saveStateToLocalStorage = (store: any) => {
    var currentSettingReducer = store.getState().settingReducer;
    var storedSettingReducer = JSON.parse(localStorage.getItem(CacheKey.SettingReducerKey) || '{}');
    if (storedSettingReducer == null
        || storedSettingReducer.isDark !== currentSettingReducer.isDark
        || storedSettingReducer.selectedLanguage !== currentSettingReducer.selectedLanguage
        || storedSettingReducer.useAltGlyphs !== currentSettingReducer.useAltGlyphs) {
        localStorage.setItem(CacheKey.SettingReducerKey, JSON.stringify(currentSettingReducer))
    }

    var currentCartReducer = store.getState().cartReducer;
    var storedCartReducer = localStorage.getItem(CacheKey.CartReducerKey);
    if (storedCartReducer == null
        || storedCartReducer !== JSON.stringify(currentCartReducer?.cartItems || [])) {
        localStorage.setItem(CacheKey.CartReducerKey, JSON.stringify(currentCartReducer))
    }

    var currentFavouriteReducer = store.getState().favouriteReducer;
    var storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
    if (storedFavouriteReducer == null
        || storedFavouriteReducer !== JSON.stringify(currentFavouriteReducer?.favouriteItems || [])) {
        localStorage.setItem(CacheKey.FavouriteReducerKey, JSON.stringify(currentFavouriteReducer))
    }
}