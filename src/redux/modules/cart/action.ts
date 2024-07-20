import { ADDITEM, EDITITEM, REMOVEITEM, REMOVEALLITEM } from './type';
import { CartItem } from '../../../contracts/cart/cartItem';

export const addItemToCart = (cartItem: CartItem) => {
  return {
    cartItem,
    type: ADDITEM,
  };
};

export const editItemInCart = (cartItemIndex: number, cartItem: CartItem) => {
  return {
    cartItem,
    cartItemIndex,
    type: EDITITEM,
  };
};

export const removeItemFromCart = (cartItemId: string) => {
  return {
    cartItemId,
    type: REMOVEITEM,
  };
};

export const removeAllItems = () => {
  return {
    type: REMOVEALLITEM,
  };
};
