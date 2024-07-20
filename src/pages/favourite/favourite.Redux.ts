import { State } from '../../redux/state';

import { removeItemFromFavourite } from '../../redux/modules/favourite/action';
import { getFavouriteItems } from '../../redux/modules/favourite/selector';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';

export interface IReduxProps {
  favourites: Array<FavouriteItem>;
  removeItemFromFavourites: (favouriteItemId: string) => void;
}

export const mapStateToProps = (state: State) => {
  return {
    favourites: getFavouriteItems(state),
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    removeItemFromFavourites: (itemId: string) => {
      dispatch(removeItemFromFavourite(itemId));
    },
  };
};
