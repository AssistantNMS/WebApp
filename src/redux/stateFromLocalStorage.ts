import * as CacheKey from './cacheKey';

import { initialCartState } from './modules/cart/index';
import { initialFavouriteState } from './modules/favourite';
import { initialPortalState } from './modules/portal/index';
import { initialSettingState } from './modules/setting/index';
import { initialTitleState } from './modules/titles';
import State from './state';
import { StateSettingReducer } from './state/StateSettingReducer';

export const loadStateFromLocalStorage = (): Omit<State, 'commonReducer'> => {
  let settingReducer = initialSettingState;
  const storedSettingReducer = localStorage.getItem(CacheKey.SettingReducerKey);
  if (storedSettingReducer && storedSettingReducer !== 'undefined') {
    settingReducer = JSON.parse(storedSettingReducer || '{}');
  }
  settingReducer.menuIsVisible = false;

  let cartReducer = initialCartState;
  const storedCartReducer = localStorage.getItem(CacheKey.CartReducerKey);
  if (storedCartReducer && storedCartReducer !== 'undefined') {
    cartReducer = JSON.parse(storedCartReducer || '{}');
  }

  let portalReducer = initialPortalState;
  const storedPortalReducer = localStorage.getItem(CacheKey.PortalReducerKey);
  if (storedPortalReducer && storedPortalReducer !== 'undefined') {
    portalReducer = JSON.parse(storedPortalReducer || '{}');
  }

  let favouriteReducer = initialFavouriteState;
  const storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
  if (storedFavouriteReducer && storedFavouriteReducer !== 'undefined') {
    favouriteReducer = JSON.parse(storedFavouriteReducer || '{}');
  }

  let titleReducer = initialTitleState;
  const storedTitleReducer = localStorage.getItem(CacheKey.TitleReducerKey);
  if (storedTitleReducer && storedTitleReducer !== 'undefined') {
    titleReducer = JSON.parse(storedTitleReducer || '{}');
  }

  const persistedState: Omit<State, 'commonReducer'> = {
    settingReducer,
    cartReducer,
    portalReducer,
    favouriteReducer,
    titleReducer,
  };
  return persistedState;
};

export const saveStateToLocalStorage = (store: { getState: () => State }) => {
  const currentSettingReducer = store.getState().settingReducer;
  const storedSettingReducer: StateSettingReducer = JSON.parse(localStorage.getItem(CacheKey.SettingReducerKey) || '{}');
  if (
    storedSettingReducer == null ||
    storedSettingReducer.selectedLanguage !== currentSettingReducer.selectedLanguage ||
    storedSettingReducer.useAltGlyphs !== currentSettingReducer.useAltGlyphs ||
    storedSettingReducer.selectedFont !== currentSettingReducer.selectedFont ||
    storedSettingReducer.chosenPlatform !== currentSettingReducer.chosenPlatform ||
    storedSettingReducer.playerName !== currentSettingReducer.playerName ||
    storedSettingReducer.mobileTipHidden !== currentSettingReducer.mobileTipHidden
  ) {
    localStorage.setItem(CacheKey.SettingReducerKey, JSON.stringify(currentSettingReducer));
  }

  const currentCartReducer = store.getState().cartReducer;
  const storedCartReducer = localStorage.getItem(CacheKey.CartReducerKey);
  if (storedCartReducer == null || storedCartReducer !== JSON.stringify(currentCartReducer?.cartItems || [])) {
    localStorage.setItem(CacheKey.CartReducerKey, JSON.stringify(currentCartReducer));
  }

  const currentPortalReducer = store.getState().portalReducer;
  const storedPortalReducer = localStorage.getItem(CacheKey.PortalReducerKey);
  if (storedPortalReducer == null || storedPortalReducer !== JSON.stringify(currentPortalReducer?.portals || [])) {
    localStorage.setItem(CacheKey.PortalReducerKey, JSON.stringify(currentPortalReducer));
  }

  const currentFavouriteReducer = store.getState().favouriteReducer;
  const storedFavouriteReducer = localStorage.getItem(CacheKey.FavouriteReducerKey);
  if (storedFavouriteReducer == null || storedFavouriteReducer !== JSON.stringify(currentFavouriteReducer?.favouriteItems || [])) {
    localStorage.setItem(CacheKey.FavouriteReducerKey, JSON.stringify(currentFavouriteReducer));
  }

  const currentTitleReducer = store.getState().titleReducer;
  const storedTitleReducer = localStorage.getItem(CacheKey.TitleReducerKey);
  if (storedTitleReducer == null || storedTitleReducer !== JSON.stringify(currentTitleReducer?.titles || [])) {
    localStorage.setItem(CacheKey.TitleReducerKey, JSON.stringify(currentTitleReducer));
  }
};
