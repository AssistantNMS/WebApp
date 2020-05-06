import { State } from '../../redux/state';

import { getPortals } from '../../redux/modules/portal/selector';

export const mapStateToProps = (state: State) => {
    return {
        portals: getPortals(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    // newProps.addItemToCart = (cartItem: CartItem) => {
    //     dispatch(addItemToCart(cartItem));
    // };
    // newProps.editItemInCart = (cartItemIndex: number, cartItem: CartItem) => {
    //     dispatch(editItemInCart(cartItemIndex, cartItem));
    // };
    // newProps.removeItemFromCart = (cartItemId: string) => {
    //     dispatch(removeItemFromCart(cartItemId));
    // };
    // newProps.removeAllItems = () => {
    //     dispatch(removeAllItems());
    // };
    return { ...newProps };
}