import State from '../../state';
import { CartItem } from '../../../contracts/cart/cartItem';

export const getCartItems = (state: State): Array<CartItem> => state?.cartReducer?.cartItems ?? [];
