import { CartItem } from '../../../contracts/cart/cartItem';
import { FavouriteItem } from '../../../contracts/favourite/favouriteItem';
import { addItemToCart } from '../../../redux/modules/cart/action';
import { getCartItems } from '../../../redux/modules/cart/selector';
import { addItemToFavourite, removeItemFromFavourite } from '../../../redux/modules/favourite/action';
import { getFavouriteItems } from '../../../redux/modules/favourite/selector';
import { State } from '../../../redux/state';

export interface IFromRedux {
    favourites: Array<FavouriteItem>;
    addItemToCart?: (cartItem: CartItem) => void;
    addItemToFavourite?: (favouriteItem: FavouriteItem) => void;
    removeItemFromFavourite?: (appId: string) => void;
}

export const mapStateToProps = (state: State) => {
    return {
        cartItems: getCartItems(state),
        favourites: getFavouriteItems(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addItemToCart = (cartItem: CartItem) => {
        dispatch(addItemToCart(cartItem));
    };
    newProps.addItemToFavourite = (favouriteItem: FavouriteItem) => {
        dispatch(addItemToFavourite(favouriteItem));
    };
    newProps.removeItemFromFavourite = (appId: string) => {
        dispatch(removeItemFromFavourite(appId));
    };
    return { ...newProps };
}