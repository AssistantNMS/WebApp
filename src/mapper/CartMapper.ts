import { RequiredItem } from '../contracts/RequiredItem';
import { CartItem } from '../contracts/cart/cartItem';

export const requiredItemFromCart = (cartItem: CartItem): RequiredItem => {
  const reqItem: RequiredItem = {
    Id: cartItem.Id,
    Quantity: cartItem.Quantity,
  };
  return reqItem;
};
