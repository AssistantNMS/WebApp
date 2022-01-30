import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { DevDetail } from '../../../contracts/data/devDetail';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TileLoading } from '../../core/loading/loading';
import { HighlightText } from '../../common/highlightText';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends DevDetail {
    searchText?: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const GameItemFromDevDetailsListTileClass: React.FC<IProps> = (props: IProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    if (item == null) {
        return (<TileLoading />);
    }

    const gameId = props?.Properties?.find?.(p => p.Name === 'GameId')?.Value;
    const name = props?.Properties?.find?.(p => p.Name === 'Name')?.Value;

    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="GameItemFromDevDetailsListTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} />
            <div className="gen-item-content-container">
                <div className="text-container">
                    <p className="small">
                        <span>{item.Name}</span>
                        <HighlightText orig={gameId ?? ''} search={props.searchText} />
                        <HighlightText orig={name ?? ''} search={props.searchText} />
                    </p>
                </div>
            </div>
        </Link>
    );
}

const GameItemFromDevDetailsListTileClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    GameItemFromDevDetailsListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const GameItemFromDevDetailsListTile = (props: IWithoutDepInj): JSX.Element => <GameItemFromDevDetailsListTileClassWithDepInj {...props} />;