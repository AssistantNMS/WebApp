import * as CacheKey from './cacheKey';

import { initialSettingState } from './modules/setting/index';
import { initialCartState } from './modules/cart/index';
import { initialPortalState } from './modules/portal/index';
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

    let portalReducer = initialPortalState;
    let storedPortalReducer = localStorage.getItem(CacheKey.PortalReducerKey);
    if (storedPortalReducer && storedPortalReducer !== "undefined") {
        portalReducer = JSON.parse(storedPortalReducer || '{}');
    }

    let favouriteReducer = initialFavouriteState;
    let storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
    if (storedFavouriteReducer && storedFavouriteReducer !== "undefined") {
        favouriteReducer = JSON.parse(storedFavouriteReducer || '{}');
    }

    let persistedState: any = {
        settingReducer,
        cartReducer,
        portalReducer,
        favouriteReducer
    }
    return persistedState;
}

export const saveStateToLocalStorage = (store: any) => {
    const currentSettingReducer = store.getState().settingReducer;
    const storedSettingReducer = JSON.parse(localStorage.getItem(CacheKey.SettingReducerKey) || '{}');
    if (storedSettingReducer == null
        || storedSettingReducer.selectedLanguage !== currentSettingReducer.selectedLanguage
        || storedSettingReducer.useAltGlyphs !== currentSettingReducer.useAltGlyphs
        || storedSettingReducer.selectedFont !== currentSettingReducer.selectedFont
    ) {
        localStorage.setItem(CacheKey.SettingReducerKey, JSON.stringify(currentSettingReducer));
    }

    const currentCartReducer = store.getState().cartReducer;
    const storedCartReducer = localStorage.getItem(CacheKey.CartReducerKey);
    if (storedCartReducer == null
        || storedCartReducer !== JSON.stringify(currentCartReducer?.cartItems || [])) {
        localStorage.setItem(CacheKey.CartReducerKey, JSON.stringify(currentCartReducer));
    }

    const currentPortalReducer = store.getState().portalReducer;
    const storedPortalReducer = localStorage.getItem(CacheKey.PortalReducerKey);
    if (storedPortalReducer == null
        || storedPortalReducer !== JSON.stringify(currentPortalReducer?.portalItems || [])) {
        localStorage.setItem(CacheKey.PortalReducerKey, JSON.stringify(currentPortalReducer));
    }

    const currentFavouriteReducer = store.getState().favouriteReducer;
    const storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
    if (storedFavouriteReducer == null
        || storedFavouriteReducer !== JSON.stringify(currentFavouriteReducer?.favouriteItems || [])) {
        localStorage.setItem(CacheKey.FavouriteReducerKey, JSON.stringify(currentFavouriteReducer));
    }
}