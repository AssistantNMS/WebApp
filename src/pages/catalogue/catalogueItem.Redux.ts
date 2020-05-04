import { State } from '../../redux/state';

import { GameItemModel } from '../../contracts/GameItemModel';
import { CartItem } from '../../contracts/cart/cartItem';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';

import { addItemToCart } from '../../redux/modules/cart/action';
import { addItemToFavourite, removeItemFromFavourite } from '../../redux/modules/favourite/action';

import { getCurrentLanguage } from '../../redux/modules/setting/selector';
import { getFavouriteItems } from '../../redux/modules/favourite/selector';


export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: getCurrentLanguage(state),
        favourites: getFavouriteItems(state)
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addItemToCart = (item: GameItemModel, quantity: number) => {
        const cartItem: CartItem = {
            Icon: item.Icon,
            Id: item.Id,
            RequiredItems: item.RequiredItems,
            TypeName: item.TypeName,
            Quantity: quantity
        }
        dispatch(addItemToCart(cartItem));
    };
    newProps.addItemToFavourites = (item: GameItemModel) => {
        const favouriteItem: FavouriteItem = {
            Icon: item.Icon,
            Id: item.Id,
        }
        dispatch(addItemToFavourite(favouriteItem));
    };
    newProps.removeItemToFavourites = (itemId: string) => {
        dispatch(removeItemFromFavourite(itemId));
    };
    return { ...newProps };
}