import i18next from 'i18next';
import React from 'react';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartListTile } from '../../components/tilePresenter/cartListTile/cartListTile';
import * as Route from '../../constants/Route';
import { CartItem } from '../../contracts/cart/cartItem';
import { LocaleKey } from '../../localization/LocaleKey';
import { requiredItemFromCart } from '../../mapper/CartMapper';
import { PositiveButton } from '../../components/common/button/positiveButton';

interface IProps {
    // Container Props
    history: any;
    cartItems: Array<CartItem>
    editItemInCart?: (cartItemIndex: number, cartItem: CartItem) => void;
    removeItemFromCart: (cartItemId: string) => void;
}

export const CartPresenter: React.FC<IProps> = (props: IProps) => {
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
            <PositiveButton
                additionalClass="button-active-bg center full"
                onClick={() => props.history.push({
                    pathname: Route.genericAllRequirements,
                    state: {
                        typeName: i18next.t(LocaleKey.cart),
                        requiredItems: props.cartItems.map(ci => requiredItemFromCart(ci))
                    }
                })}
            >
                <span>{i18next.t(LocaleKey.viewAllRawMaterialsRequired)}</span>
            </PositiveButton>
        );
    };

    const title = i18next.t(LocaleKey.cart);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1">
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
};
