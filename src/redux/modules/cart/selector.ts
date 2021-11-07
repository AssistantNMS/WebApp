import State from "../../state";
import { CartItem } from "../../../contracts/cart/CartItem";

export const getCartItems = (state: State): Array<CartItem> => state?.cartReducer?.cartItems ?? [];
