import State from '../../state';
import { FavouriteItem } from '../../../contracts/favourite/favouriteItem';

export const getFavouriteItems = (state: State): Array<FavouriteItem> => state?.favouriteReducer?.favouriteItems ?? [];
