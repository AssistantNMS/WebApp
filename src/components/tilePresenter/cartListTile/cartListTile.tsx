import * as React from 'react';
import { translate } from '../../../localization/Translate';
import { Link } from 'react-router-dom';

import { LocaleKey } from '../../../localization/LocaleKey';
import { CartItem } from '../../../contracts/cart/cartItem';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { ActionContainer } from '../../common/tile/actionContainer';

import { GameItemService } from '../../../services/json/GameItemService';
import { getQuantityDialog } from '../../../helper/dialogHelper';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { RequiredItem } from '../../../contracts/RequiredItem';
import { OnClickEvent } from '../../../helper/typescriptHacks';

interface IWithDepInj {
  gameItemService: GameItemService;
}
interface IWithoutDepInj {
  Icon: string;
  Id: string;
  RequiredItems: Array<RequiredItem>;
  Quantity: number;
  editItemInCart?: (cartItem: CartItem) => void;
  removeItemFromCart?: (cartItemId: string) => void;
}

interface IProps extends IWithDepInj, IWithoutDepInj {}

interface IState {
  name: string;
  icon: string;
  colour: string;
}

class CartItemListTileClass extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '...',
      icon: 'loader.svg',
      colour: '',
    };

    this.fetchData(this.props.Id);
  }

  fetchData = async (itemId: string) => {
    const itemDetails = await this.props.gameItemService?.getItemDetails?.(itemId);
    if (itemDetails == null) return;

    this.setState(() => {
      return {
        name: itemDetails.value.Name,
        icon: itemDetails.value.Icon,
        colour: itemDetails.value.Colour,
      };
    });
  };

  getActions = () => {
    const result = [];
    if (this.props.editItemInCart) {
      result.push(
        <i key="edit" onClick={this.editItem} className="material-icons">
          edit
        </i>,
      );
    }
    if (this.props.removeItemFromCart) {
      result.push(
        <i key="delete" onClick={this.deleteItem} className="material-icons">
          delete
        </i>,
      );
    }
    return result;
  };

  editItem = async (e: OnClickEvent) => {
    e.preventDefault?.();
    if (this.props.editItemInCart) {
      const quantityResult = await getQuantityDialog(translate(LocaleKey.quantity), this.props.Quantity);
      if (quantityResult.isSuccess === false) return;

      const newCartItem = {
        Id: this.props.Id,
        Icon: this.props.Icon,
        RequiredItems: this.props.RequiredItems,
        Quantity: quantityResult.value,
      };
      this.props.editItemInCart(newCartItem);
    }
  };

  deleteItem = (e: OnClickEvent) => {
    e.preventDefault?.();
    if (this.props.removeItemFromCart) {
      this.props.removeItemFromCart(this.props.Id);
    }
  };

  render() {
    return (
      <Link to={`${catalogueItem}/${this.props.Id}`} data-id="CartListTile" className="gen-item-container" draggable={false}>
        <ImageContainer Name={this.state.name} Icon={this.state.icon} Colour={this.state.colour} />
        <div className="gen-item-content-container">
          <TextContainer text={this.state.name} />
          <div className="quantity-container">
            {translate(LocaleKey.quantity)}: {this.props.Quantity}
          </div>
          <ActionContainer actions={this.getActions()} />
        </div>
      </Link>
    );
  }
}

const CartListTileInternal = withServices<IWithoutDepInj, IWithDepInj>(CartItemListTileClass, (services: IDependencyInjection) => ({
  gameItemService: services.gameItemService,
}));

export const CartListTile = (
  props: CartItem,
  editItemInCart?: (cartItem: CartItem) => void,
  removeItemFromCart?: (cartItemId: string) => void,
): JSX.Element => <CartListTileInternal {...props} {...{ editItemInCart, removeItemFromCart }} />;
