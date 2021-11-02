
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { ChargeBy } from '../../../contracts/recharge/chargeBy';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { SmallLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj extends ChargeBy {
    totalChargeAmount: number;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const ChargeByItemListTileClass: React.FC<IProps> = (props: IProps) => {
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

    const childName = (props.totalChargeAmount / props.Value) + 'x ' + item.Name;
    return (
        <Link to={`${catalogueItem}/${props.Id}`} data-id="ChargeByItemListTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} />
            <div className="gen-item-content-container">
                <TextContainer text={childName} additionalCss="full" />
            </div>
        </Link>
    );
}

const ChargeByItemListTileWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    ChargeByItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const ChargeByItemListTile = (props: IProps): JSX.Element => <ChargeByItemListTileWithDepInj {...props} />;