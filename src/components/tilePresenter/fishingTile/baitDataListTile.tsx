import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppImage } from '../../../constants/AppImage';
import { catalogueItem, fishingBait } from '../../../constants/Route';
import { BaitData } from '../../../contracts/data/baitData';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IWithDepInj {
  gameItemService: GameItemService;
}

interface IWithoutDepInj extends BaitData {
  isCatalogueMode?: boolean;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const BaitDataListTileeClass: React.FC<IProps> = (props: IProps) => {
  const [item, setItem] = useState<GameItemModel>();

  useEffect(() => {
    fetchData(props.AppId);
  }, []);

  const fetchData = async (itemId: string) => {
    const itemDetails = await props.gameItemService.getItemDetails(itemId);
    setItem(itemDetails.value);
  };

  if (item == null) {
    return <TileLoading />;
  }

  const valueToPercent = (value: number) => {
    if (value < 1.0) {
      return (<span className="negative">- {((1 - value) * 100).toFixed(0)}%</span>);
    } else if (value > 1.0) {
      return (<span className="positive">+ {((value - 1) * 100).toFixed(0)}%</span>);
    }

    return (<span className="neutral"> ‒‒</span>);
  }

  return (
    <Link to={props.isCatalogueMode ? fishingBait : `${catalogueItem}/${props.AppId}`} data-id="BaitDataListTile" className={classNames('bait-detailed', { 'reduced-content': props.isCatalogueMode })} draggable={false}>
      <div className="info">
        <ImageContainer {...item} Icon={props.isCatalogueMode == true ? AppImage.fishingBait : item.Icon} />
        <div className="info-text">
          <TextContainer text={item.Name} />
          <div className="stats">
            <div className="img-stat">
              <img src={`/${AppImage.base}special/fishing-day.png`} className="dayNight" alt="storm" />{valueToPercent(props.DayTimeBoost)}
            </div>
            <div className="img-stat">
              <img src={`/${AppImage.base}special/fishing-night.png`} className="dayNight" alt="storm" />{valueToPercent(props.NightTimeBoost)}
            </div>
            <div className="img-stat">
              <img src={`/${AppImage.base}special/storm.png`} className="dayNight" alt="storm" />{valueToPercent(props.StormBoost)}
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <table>
          <thead>
            <tr>
              <td>Junk</td>
              <td>Common</td>
              <td>Rare</td>
              <td>Epic</td>
              <td>Legendary</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{valueToPercent(props.RarityBoosts.Junk)}</td>
              <td>{valueToPercent(props.RarityBoosts.Common)}</td>
              <td>{valueToPercent(props.RarityBoosts.Rare)}</td>
              <td>{valueToPercent(props.RarityBoosts.Epic)}</td>
              <td>{valueToPercent(props.RarityBoosts.Legendary)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
}


const BaitDataListTileeClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
  BaitDataListTileeClass,
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);

export const BaitDataListTile = (props: IWithoutDepInj): JSX.Element => <BaitDataListTileeClassWithDepInj {...props} />;
