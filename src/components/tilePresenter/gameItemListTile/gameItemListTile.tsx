import * as React from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from '../../../localization/Translate';
import { catalogueItem } from '../../../constants/Route';
import { CartItem } from '../../../contracts/cart/cartItem';
import { FavouriteItem } from '../../../contracts/favourite/favouriteItem';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { invertColor } from '../../../helper/colourHelper';
import { getQuantityDialog } from '../../../helper/dialogHelper';
import { removeXmlTags } from '../../../helper/stringHelper';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ToastService } from '../../../services/toastService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { CustomContextMenu } from '../../core/contextMenu/contextMenu';
import { IFromRedux, mapDispatchToProps, mapStateToProps } from './gameItemListTile.Redux';

interface IWithDepInj {
  toastService: ToastService;
}

interface IWithoutDepInj {
  item: GameItemModel;
}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj {}

export const GameItemListTileUnconnected: React.FC<IProps> = (props: IProps) => {
  const containerRef = useRef(null);
  const itemIsFavourited = (props.favourites ?? []).findIndex((f) => f.Id === props.item.Id) >= 0;
  const iconString = itemIsFavourited ? 'star' : 'star_border';

  return (
    <Link to={`${catalogueItem}/${props.item.Id}`} ref={containerRef} data-id="GameItemListTile" className="item" draggable={false}>
      <TextContainer text={props.item.Name} />
      <ImageContainer {...props.item} Name={removeXmlTags(props.item.Description)} />
      {itemIsFavourited && (
        <i className="material-icons top-right" style={{ color: invertColor(props.item.Colour || '000000', true) }}>
          {iconString}
        </i>
      )}

      <CustomContextMenu
        id={props.item.Id}
        parentRef={containerRef}
        options={[
          itemIsFavourited
            ? {
                // TODO translate
                content: (
                  <span>
                    <i className="material-icons">star</i>&nbsp;&nbsp;Remove from Favourites
                  </span>
                ),
                onClick: () => {
                  props.removeItemFromFavourite?.(props.item.Id);
                  // TODO - translate
                  props.toastService.success('Removed from Favourites');
                },
              }
            : {
                // TODO translate
                content: (
                  <span>
                    <i className="material-icons">star</i>&nbsp;&nbsp;Add to Favourites
                  </span>
                ),
                onClick: () => {
                  const favouriteItem: FavouriteItem = {
                    Id: props.item.Id,
                    Icon: props.item.Icon,
                  };
                  props.addItemToFavourite?.(favouriteItem);
                  // TODO - translate
                  props.toastService.success('Added to Favourites');
                },
              },
          {
            content: (
              <span>
                <i className="material-icons">shopping_basket</i>&nbsp;&nbsp;Add to Cart
              </span>
            ),
            onClick: async () => {
              const quantityResult = await getQuantityDialog(translate(LocaleKey.quantity));
              if (quantityResult.isSuccess === false) return;
              const cartItem: CartItem = {
                Icon: props.item.Icon,
                Id: props.item.Id,
                RequiredItems: props.item.RequiredItems,
                Quantity: quantityResult.value,
              };
              props.addItemToCart?.(cartItem);
              // TODO - translate
              props.toastService.success(`Added ${props.item.Name} to cart`);
            },
          },
        ]}
      />
    </Link>
  );
};

export const GameItemListTile = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(GameItemListTileUnconnected),
  (services: IDependencyInjection) => ({
    toastService: services.toastService,
  }),
);
