import * as type from './type';
import { StateFavouriteReducer } from '../../state/StateFavouriteReducer';

export const initialFavouriteState: StateFavouriteReducer = {
  favouriteItems: [],
};

export const favouriteReducer = (state = initialFavouriteState, action: any) => {
  switch (action.type) {
    case type.ADDITEM:
      return Object.assign({}, state, {
        favouriteItems: [...state.favouriteItems, action.favouriteItem],
      });
    case type.REMOVEITEM:
      return Object.assign({}, state, {
        favouriteItems: state.favouriteItems.filter((fi) => fi.Id !== action.favouriteItemId),
      });
    case type.REMOVEALLITEM:
      return Object.assign({}, state, {
        favouriteItems: [],
      });
    default:
      return state;
  }
};
