import { State } from '../../redux/state';
import { addItemToCart } from '../../redux/modules/cart/action';
import { GameItemModel } from '../../contracts/GameItemModel';
import { CartItem } from '../../contracts/cart/cartItem';

export const mapStateToProps = (state: State) => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
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
    return { ...newProps };
}