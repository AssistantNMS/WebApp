import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CartItem } from '../../contracts/cart/cartItem';
import { mapDispatchToProps, mapStateToProps } from './cart.Redux';
import { CartPresenter } from './cartPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    cartItems: Array<CartItem>
    editItemInCart?: (cartItemIndex: number, cartItem: CartItem) => void;
    removeItemFromCart: (cartItemId: string) => void;
}

export const CartContainerUnconnected = withRouter((props: IProps) => {
    return (
        <CartPresenter {...this.props} />
    );
});

export const CartContainer = connect(mapStateToProps, mapDispatchToProps)(CartContainerUnconnected);