import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './cart.Redux';
import { NavBar } from '../../components/core/navbar/navbar';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { CartItem } from '../../contracts/cart/cartItem';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { CartListTile } from '../../components/tilePresenter/cartListTile/cartListTile';
import { CardButton } from '../../components/core/button/cardButton';
import { genericAllRequirements } from '../../constants/Route';

import { requiredItemFromCart } from '../../mapper/CartMapper';

interface IProps {
    location: any;
    match: any;
    history: any;
    cartItems: Array<CartItem>
    editItemInCart?: (cartItemIndex: number, cartItem: CartItem) => void;
    removeItemFromCart: (cartItemId: string) => void;
}

export const CartPresenterUnconnected = withRouter((props: IProps) => {
    const title = i18next.t(LocaleKey.cart);
    setDocumentTitle(title);

    const displayCartItems = (cartItems: Array<CartItem>) => {
        if (cartItems == null || cartItems.length === 0) return (
            <h2>{i18next.t(LocaleKey.noCartItems)}</h2>
        );

        const connectedPresenter = (localProps: CartItem, index: number) => {
            const editItemInCart = (cartItem: CartItem) => {
                if (props.editItemInCart) {
                    props.editItemInCart(index, cartItem);
                }
            }
            return CartListTile(localProps, editItemInCart, props.removeItemFromCart);
        }

        return <GenericListPresenter list={cartItems} presenter={connectedPresenter} identifier={(item: CartItem) => item.Id} />;
    };

    const displayCardButton = (cartItems: Array<CartItem>) => {
        if (cartItems == null || cartItems.length === 0) return null;

        return (
            <CardButton
                title={i18next.t(LocaleKey.viewAllRawMaterialsRequired)}
                className="button-active-bg"
                url="/"
                onClick={() => props.history.push({
                    pathname: genericAllRequirements,
                    state: {
                        typeName: i18next.t(LocaleKey.cart),
                        requiredItems: props.cartItems.map(ci => requiredItemFromCart(ci))
                    }
                })}
            />
        );
    };

    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="row" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="col-12">
                        {displayCartItems(props.cartItems)}
                    </div>
                </div>
                <div className="row justify">
                    <div className="col-12 ta-center">
                        {displayCardButton(props.cartItems)}
                    </div>
                </div>
            </div>
        </>
    );
});

export const CartPresenter = connect(mapStateToProps, mapDispatchToProps)(CartPresenterUnconnected);