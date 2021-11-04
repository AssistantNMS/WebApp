
import i18next from 'i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { ExpeditionSeasonReward } from '../../../contracts/helloGames/expeditionSeason';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { SmallLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends ExpeditionSeasonReward {
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const ExpeditionSeasonRewardTileInternal: React.FC<IProps> = (props: IProps) => {
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
        return (<SmallLoading />);
    }

    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="ExpeditionSeasonRewardTile" className="gen-item-container" draggable={false}>
            <ImageContainer {...item} />
            <div className="gen-item-content-container">
                <TextContainer text={item.Name} />
                <div className="quantity-container">{i18next.t(LocaleKey.quantity)}: {props.AmountMin}</div>
            </div>
        </Link>
    );
}

const ExpeditionSeasonRewardTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    ExpeditionSeasonRewardTileInternal,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const ExpeditionSeasonRewardTile = (props: IWithoutDepInj): JSX.Element => <ExpeditionSeasonRewardTileWithDepInj {...props} />;