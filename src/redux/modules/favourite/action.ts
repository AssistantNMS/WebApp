import { ADDITEM, REMOVEITEM, REMOVEALLITEM } from './type';
import { FavouriteItem } from '../../../contracts/favourite/favouriteItem';

export const addItemToFavourite = (favouriteItem: FavouriteItem) => {
  return {
    favouriteItem,
    type: ADDITEM,
  };
};

export const removeItemFromFavourite = (favouriteItemId: string) => {
  return {
    favouriteItemId,
    type: REMOVEITEM,
  };
};

export const removeAllFavourites = () => {
  return {
    type: REMOVEALLITEM,
  };
};
