import * as type from './type'
import { StateCartReducer } from '../../state/StateCartReducer';

export const initialCartState: StateCartReducer = {
    cartItems: []
}

export const cartReducer = (state = initialCartState, action: any) => {
    switch (action.type) {
        case type.ADDITEM:
            return Object.assign({}, state, {
                cartItems: [...state.cartItems, action.cartItem],
            });
        case type.EDITITEM:
            return Object.assign({}, state, {
                cartItems: [
                    ...state.cartItems.slice(0, action.cartItemIndex),
                    action.cartItem,
                    ...state.cartItems.slice(action.cartItemIndex + 1)
                ],
            });
        case type.REMOVEITEM:
            return Object.assign({}, state, {
                cartItems: state.cartItems.filter(ci => ci.Id !== action.cartItemId),
            });
        case type.REMOVEALLITEM:
            return Object.assign({}, state, {
                cartItems: [],
            });
        default:
            return state
    }
}
