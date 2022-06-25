import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { PositiveButton } from '../../components/common/button/positiveButton';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { CartListTile } from '../../components/tilePresenter/cartListTile/cartListTile';
import * as Route from '../../constants/Route';
import { CartItem } from '../../contracts/cart/cartItem';
import { withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { requiredItemFromCart } from '../../mapper/CartMapper';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './cart.Redux';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

const CartPresenterConnected: React.FC<IProps> = (props: IProps) => {
    const navigate = useNavigate();

    const displayCartItems = (cartItems: Array<CartItem>) => {
        if (cartItems == null || cartItems.length === 0) return (
            <h2>{translate(LocaleKey.noCartItems)}</h2>
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
                onClick={() => {
                    const state = {
                        typeName: translate(LocaleKey.cart),
                        requiredItems: props.cartItems.map(ci => requiredItemFromCart(ci))
                    };
                    navigate(Route.genericAllRequirements, { state: { ...state } });
                }}
            >
                <span>{translate(LocaleKey.viewAllRawMaterialsRequired)}</span>
            </PositiveButton>
        );
    };

    const title = translate(LocaleKey.cart);
    return (
        <DefaultAnimation>
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
        </DefaultAnimation>
    );
};

export const CartPresenter = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CartPresenterConnected),
    () => ({})
);

