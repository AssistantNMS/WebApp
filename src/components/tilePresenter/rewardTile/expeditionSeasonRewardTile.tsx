import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { ExpeditionSeasonReward } from '../../../contracts/helloGames/expeditionSeason';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { CustomizedRequiredItemDetails } from '../../common/tile/quantityContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IWithDepInj {
  gameItemService: GameItemService;
}

interface IWithoutDepInj extends ExpeditionSeasonReward {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const ExpeditionSeasonRewardTileInternal: React.FC<IProps> = (props: IProps) => {
  const [item, setItem] = useState<GameItemModel>();

  useEffect(() => {
    fetchData(props.Id);
  }, []);

  const fetchData = async (itemId: string) => {
    const itemDetails = await props.gameItemService.getItemDetails(itemId);
    setItem(itemDetails.value);
  };

  if (item == null) {
    return <TileLoading />;
  }

  const customizedReqItem: CustomizedRequiredItemDetails = {
    Id: props.Id,
    Icon: item.Icon,
    Colour: item.Colour,
    Name: item.Name,
    Quantity: props.AmountMax,
  };
  if (props.AmountMin !== props.AmountMax) {
    customizedReqItem.QuantityRange = `(${props.AmountMin} - ${props.AmountMax})`;
  }

  const displayQuantity = props.AmountMax > 0;
  const displayQuantityBlueprint = props.AmountMax < 1 && props.Type === 1;

  let additionalCss = 'full';
  if (displayQuantity) additionalCss = '';
  if (displayQuantityBlueprint) additionalCss = '';

  return (
    <Link to={`${catalogueItem}/${props.Id}`} data-id="ExpeditionSeasonRewardTile" className="gen-item-container" draggable={false}>
      <ImageContainer {...item} />
      <div className="gen-item-content-container" data-type={props.Type}>
        <TextContainer text={item.Name} additionalCss={additionalCss} />
        {displayQuantity && (
          <div className="quantity-container">
            {translate(LocaleKey.quantity)}: {props.AmountMax}
          </div>
        )}
        {displayQuantityBlueprint && <div className="quantity-container">{translate(LocaleKey.blueprint)}</div>}
      </div>
    </Link>
  );
};

const ExpeditionSeasonRewardTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
  ExpeditionSeasonRewardTileInternal,
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);

export const ExpeditionSeasonRewardTile = (props: IWithoutDepInj): JSX.Element => <ExpeditionSeasonRewardTileWithDepInj {...props} />;
