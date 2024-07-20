import * as type from './type';
import { StateCommonReducer } from '../../state/StateCommonReducer';

const initialState: StateCommonReducer = {
  isLoading: false,
  title: 'Loading',
};

export const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case type.LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        text: action.text,
      });
    default:
      return state;
  }
};
