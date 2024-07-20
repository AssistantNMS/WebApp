import { translate } from '../../../localization/Translate';
import React, { useEffect, useState } from 'react';
import { TileLoading } from '../../../components/core/loading/loading';
import { EggNeuralTrait } from '../../../contracts/data/eggNeuralTrait';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ActionContainer } from '../../common/tile/actionContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IWithDepInj {
  gameItemService: GameItemService;
}

interface IWithoutDepInj extends EggNeuralTrait {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const EggTraitListTileInternal: React.FC<IProps> = (props: IProps) => {
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

  const getActions = () => {
    if (props.IsPositiveEffect) {
      return [<img key="increasing" alt="increase" src="/assets/images/special/increasing.png" />];
    }
    return [<img key="decreasing" alt="decrease" src="/assets/images/special/decreasing.png" />];
  };

  return (
    <div data-id="EggTraitListTileClass" className="gen-item-container" draggable={false}>
      <div className="image-container">
        <ImageContainer Name={item.Description} Icon={`other/93.png`} />
      </div>
      <div className="gen-item-content-container">
        <TextContainer text={translate(props.TraitType)} />
        <div className="quantity-container">{translate(props.Trait)}</div>
        <ActionContainer actions={getActions()} />
      </div>
    </div>
  );
};

const EggTraitListTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(EggTraitListTileInternal, (services: IDependencyInjection) => ({
  gameItemService: services.gameItemService,
}));

export const EggTraitListTile = (props: IWithoutDepInj): JSX.Element => <EggTraitListTileWithDepInj {...props} />;
