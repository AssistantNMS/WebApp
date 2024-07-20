import { combineReducers } from 'redux';

import { commonReducer } from './modules/common';
import { setLoadingStatus } from './modules/common/action';

import { CommonFunctions } from './entities/CommonFunctions';
import { ICommonFunctions } from './entities/interface/ICommonFunctions';

import { settingReducer } from './modules/setting';
import { cartReducer } from './modules/cart';
import { portalReducer } from './modules/portal';
import { favouriteReducer } from './modules/favourite';
import { titleReducer } from './modules/titles';

export const reducer = combineReducers({
  commonReducer,
  settingReducer,
  cartReducer,
  portalReducer,
  favouriteReducer,
  titleReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonMapDispatchToProps = (dispatch: any): ICommonFunctions => {
  const commonFunctions = new CommonFunctions();
  commonFunctions.setLoadingStatus = (isLoading: boolean, title?: string) => {
    dispatch(setLoadingStatus(isLoading, title));
  };

  return Object.assign({}, commonFunctions);
};
