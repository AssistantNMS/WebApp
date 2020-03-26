import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './cart.Redux';
import { NavBar } from '../../components/core/navbar/navbar';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { CartItem } from '../../contracts/cart/cartItem';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { CartListTile } from '../../components/tilePresenter/cartLlistTile';

interface IProps {
    cartItems: Array<CartItem>
}

export const CartPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    const title = i18next.t(LocaleKey.cart);
    setDocumentTitle(title);

    const displayCartItems = (cartItems: Array<CartItem>) => {
        if (props.cartItems == null || props.cartItems.length === 0) return (
            <h2>{i18next.t(LocaleKey.noCartItems)}</h2>
        );

        return <GenericListPresenter list={props.cartItems} presenter={CartListTile} />;
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
            </div>
        </>
    );
}

export const CartPresenter = connect(mapStateToProps, mapDispatchToProps)(CartPresenterUnconnected);