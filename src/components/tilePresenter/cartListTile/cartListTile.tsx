import * as React from 'react';
import i18next from 'i18next';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { LocaleKey } from '../../../localization/LocaleKey';
import { CartItem } from '../../../contracts/cart/cartItem';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { ActionContainer } from '../../common/tile/actionContainer';

import { GameItemService } from '../../../services/GameItemService';

interface IState {
    name: string;
    icon: string;
    colour: string;
    gameItemService: GameItemService;
}

interface IProps extends CartItem {
    editItemInCart?: (cartItem: CartItem) => void;
    removeItemFromCart?: (cartItemId: string) => void;
}

class CartItemListTileClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            name: '...',
            icon: 'loader.svg',
            colour: '',
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.Id);
    }

    fetchData = async (itemId: string) => {
        const itemDetails = await this.state.gameItemService.getItemDetails(itemId);

        this.setState(() => {
            return {
                name: itemDetails.value.Name,
                icon: itemDetails.value.Icon,
                colour: itemDetails.value.Colour
            }
        });
    }

    getActions = () => {
        const result = [];
        if (this.props.editItemInCart) {
            result.push(<i key="edit" onClick={this.editItem} className="material-icons">edit</i>);
        }
        if (this.props.removeItemFromCart) {
            result.push(<i key="delete" onClick={this.deleteItem} className="material-icons">delete</i>);
        }
        return result;
    }

    editItem = async (e: any) => {
        e.preventDefault();
        if (this.props.editItemInCart) {
            const { value: quantity } = await Swal.fire({
                title: i18next.t(LocaleKey.quantity),
                input: 'number',
                inputValue: '1',
                showCancelButton: true
            });
            if (isNaN(quantity)) return;
            const newCartItem = { ...this.props, ...{ Quantity: quantity } }
            this.props.editItemInCart(newCartItem);
        }
    }

    deleteItem = (e: any) => {
        e.preventDefault();
        if (this.props.removeItemFromCart) {
            this.props.removeItemFromCart(this.props.Id);
        }
    }

    render() {
        return (
            <Link to={`${catalogueItem}/${this.props.Id}`} className="gen-item-container" draggable={false}>
                <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} />
                <div className="gen-item-content-container">
                    <TextContainer text={this.state.name} />
                    <div className="quantity-container">{i18next.t(LocaleKey.quantity)}: {this.props.Quantity}</div>
                    <ActionContainer actions={this.getActions()} />
                </div>
            </Link>
        );
    }
}

// export const CartListTile = (props: CartItem, index: number): JSX.Element => <CartItemListTileClass {...props} index={index} />;

// export const CartListTileConnected = connect(mapStateToProps, mapDispatchToProps)(CartItemListTileClass);
// export const CartListTile = (props: CartItem, index: number): JSX.Element => <CartListTileConnected {...props} index={index} />;

export const CartListTile = (props: CartItem, editItemInCart?: (cartItem: CartItem) => void, removeItemFromCart?: (cartItemId: string) => void): JSX.Element =>
    <CartItemListTileClass {...props} {...{ editItemInCart, removeItemFromCart }} />;