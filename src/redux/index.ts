import { combineReducers } from 'redux'

import { commonReducer } from './modules/common'
import { setLoadingStatus } from './modules/common/action';

import { CommonFunctions } from './entities/CommonFunctions';
import { ICommonFunctions } from './entities/interface/ICommonFunctions';

import { settingReducer } from './modules/setting';


export const reducer = combineReducers({
    commonReducer,
    settingReducer,
});

export const commonMapDispatchToProps = (dispatch: any): ICommonFunctions => {
    const commonFunctions = new CommonFunctions();
    commonFunctions.setLoadingStatus = (isLoading: boolean, title?: string) => {
        dispatch(setLoadingStatus(isLoading, title))
    };

    return Object.assign({}, commonFunctions);
}
