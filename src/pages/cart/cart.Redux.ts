import { State } from '../../redux/state';

import { addItemToCart, editItemInCart, removeItemFromCart, removeAllItems } from '../../redux/modules/cart/action';
import { CartItem } from '../../contracts/cart/cartItem';

export const mapStateToProps = (state: State) => {
    return {
        cartItems: state.cartReducer?.cartItems || [],
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    newProps.addItemToCart = (cartItem: CartItem) => {
        dispatch(addItemToCart(cartItem));
    };
    newProps.editItemInCart = (cartItemIndex: number, cartItem: CartItem) => {
        dispatch(editItemInCart(cartItemIndex, cartItem));
    };
    newProps.removeItemFromCart = (cartItemIndex: number) => {
        dispatch(removeItemFromCart(cartItemIndex));
    };
    newProps.removeAllItems = () => {
        dispatch(removeAllItems());
    };
    return { ...newProps };
}