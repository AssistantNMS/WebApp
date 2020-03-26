
import * as React from 'react';
import { CartItem } from '../../contracts/cart/cartItem';
import { RequiredItemListTile } from './requiredItemListTile/requiredItemListTile';


export const CartListTile = (props: CartItem): JSX.Element => <RequiredItemListTile {...props} />;