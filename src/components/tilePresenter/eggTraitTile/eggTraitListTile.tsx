
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { EggNeuralTrait } from '../../../contracts/data/eggNeuralTrait';
import { StatBonus } from '../../../contracts/StatBonus';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { GameItemService } from '../../../services/json/GameItemService';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { TileLoading } from '../../../components/core/loading/loading';
import { ActionContainer } from '../../common/tile/actionContainer';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends EggNeuralTrait {
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const EggTraitListTileInternal: React.FC<IProps> = (props: IProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.AppId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    if (item == null) {
        return (<TileLoading />);
    }

    const getActions = () => {
        if (props.IsPositiveEffect) {
            return [<img key="increasing" className="" src="/assets/images/special/increasing.png" />];
        }
        return [<img key="decreasing" className="" src="/assets/images/special/decreasing.png" />];
    }

    return (
        <div data-id="EggTraitListTileClass" className="gen-item-container" draggable={false}>
            <div className="image-container">
                <ImageContainer Name={item.Description} Icon={`other/93.png`} />
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={i18next.t(props.TraitType)} />
                <div className="quantity-container">{i18next.t(props.Trait)}</div>
                <ActionContainer actions={getActions()} />
            </div>
        </div>
    );
}

const EggTraitListTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    EggTraitListTileInternal,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const EggTraitListTile = (props: IWithoutDepInj): JSX.Element => <EggTraitListTileWithDepInj {...props} />;
