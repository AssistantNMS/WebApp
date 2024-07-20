import * as React from 'react';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

import { ActionContainer } from '../../common/tile/actionContainer';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { AppImage } from '../../../constants/AppImage';
import { translate } from '../../../localization/Translate';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ReactNode } from 'react-markdown/lib/react-markdown';
import { CustomTooltip } from '../../common/tooltip/tooltip';

interface IWithDepInj {}

export interface ICronusCookingWithoutDepInj {
  cookingValue: number;
}

export interface ICronusCookingProps extends IWithDepInj, ICronusCookingWithoutDepInj {}

const CronusCookingListTileClass: React.FC<ICronusCookingProps> = (props: ICronusCookingProps) => {
  const cookingPerc: string = ((props.cookingValue + 1) * props.cookingValue * 47).toFixed(0);

  const getStars = (): ReactNode => {
    const starNodes = [];
    let starValue = props.cookingValue * 5;
    for (let starValIndx = 0; starValIndx < 5; starValIndx++) {
      if (starValue > 0.75) {
        starNodes.push(
          <i key={starValIndx + 'full'} className="material-icons secondary">
            star
          </i>,
        );
        starValue = starValue - 1;
        continue;
      }

      if (starValue > 0.25) {
        starNodes.push(
          <i key={starValIndx + 'half'} className="material-icons secondary">
            star_half
          </i>,
        );
        starValue = starValue - 1;
        continue;
      }

      starNodes.push(
        <i key={starValIndx + 'empty'} style={{ opacity: 0.5 }} className="material-icons">
          star
        </i>,
      );
      starValue = starValue - 1;
    }

    return starNodes;
  };

  const getActions = () => {
    const result = [
      <CustomTooltip key="nanite approx" tooltipText="Nanites" theme="transparent">
        <div key="nanite approx" className="mr-2">
          <span>±</span>
          <span>&nbsp;</span>
          {cookingPerc}
          <img src="/assets/images/rawMaterials/56.png" alt="Nanites" style={{ maxHeight: '20px', marginLeft: '5px' }} />
        </div>
      </CustomTooltip>,
    ];
    return result;
  };

  return (
    <div data-id="CronusCookingListTile" className="gen-item-container cronus noselect" draggable={false}>
      <ImageContainer Name="Cronus" Icon={AppImage.cronus} />
      <div className="gen-item-content-container">
        <TextContainer text={translate(LocaleKey.cookingValue)} />
        <div className="quantity-container">{getStars()}</div>
        <ActionContainer actions={getActions()} />
      </div>
    </div>
  );
};

export const CronusCookingListTile = withServices<ICronusCookingWithoutDepInj, IWithDepInj>(
  CronusCookingListTileClass,
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);
