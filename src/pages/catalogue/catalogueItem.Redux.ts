import { State } from '../../redux/state';

import { GameItemModel } from '../../contracts/GameItemModel';
import { CartItem } from '../../contracts/cart/cartItem';
import { FavouriteItem } from '../../contracts/favourite/favouriteItem';

import { addItemToCart } from '../../redux/modules/cart/action';
import { addItemToFavourite, removeItemFromFavourite } from '../../redux/modules/favourite/action';

import { getChosenPlatform, getCurrentLanguage } from '../../redux/modules/setting/selector';
import { getFavouriteItems } from '../../redux/modules/favourite/selector';
import { setLanguage, setPlatform } from '../../redux/modules/setting/action';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';

export interface IReduxProps {
    selectedLanguage?: string;
    favourites: Array<FavouriteItem>;
    controlPlatform: ControllerPlatformType;
    addItemToCart?: (item: GameItemModel, quantity: number) => void;
    addItemToFavourites?: (item: GameItemModel) => void;
    removeItemToFavourites?: (itemId: string) => void;
    setLanguage: (langCode: string) => void;
    setPlatform: (platform: ControllerPlatformType) => void;
}

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: getCurrentLanguage(state),
        controlPlatform: getChosenPlatform(state),
        favourites: getFavouriteItems(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addItemToCart = (item: GameItemModel, quantity: number) => {
        const cartItem: CartItem = {
            Icon: item.Icon,
            Id: item.Id,
            RequiredItems: item.RequiredItems,
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
    newProps.setLanguage = (langCode: string) => {
        dispatch(setLanguage(langCode));
    };
    newProps.setPlatform = (platform: ControllerPlatformType) => {
        dispatch(setPlatform(platform));
    };
    return { ...newProps };
}