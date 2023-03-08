
import * as React from 'react';
// import { translate } from '../../../localization/Translate';
import { Link } from 'react-router-dom';

import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { QuicksilverItem } from '../../../contracts/data/quicksilver';

import { GameItemService } from '../../../services/json/GameItemService';
import { ActionContainer } from '../../common/tile/actionContainer';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { useEffect, useState } from 'react';
import { GameItemModel } from '../../../contracts/GameItemModel';
import { TileLoading } from '../../core/loading/loading';
import { AppImage } from '../../../constants/AppImage';

interface IWithDepInj {
    gameItemService: GameItemService;
}

export interface IQuicksilverItemWithoutDepInj extends QuicksilverItem {
    isDisabled: boolean;
    showPrice?: boolean;
}

export interface IQuicksilverItemProps extends IWithDepInj, IQuicksilverItemWithoutDepInj { }

const QuicksilverItemListTileClass: React.FC<IQuicksilverItemProps> = (props: IQuicksilverItemProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.ItemId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    const getActions = () => {
        const result = [];
        if (props.isDisabled) {
            result.push(<i key="locked" className="material-icons x2 not-centered">lock</i>);
        }
        return result;
    }

    if (item == null) {
        return (<TileLoading />);
    }

    return (
        <Link to={`${catalogueItem}/${props.ItemId}`} data-id="QuicksilverItemListTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} greyScale={props.isDisabled} />
            <div className="gen-item-content-container">
                <TextContainer text={item.Name} additionalCss={(props.Tier != null && props.Tier > 0) ? "" : "full"} />
                {
                    (props.Tier != null && props.Tier > 0) &&
                    <div className="quantity-container">Tier: {props.Tier}</div>
                }
                {
                    (props.showPrice === true) &&
                    <div className="quantity-container">
                        {(item.BaseValueUnits ?? 0).toString()}
                        <img src={AppImage.quicksilver()} alt="Quicksilver" style={{ maxHeight: '20px', marginLeft: '5px' }} />
                    </div>
                }
                <ActionContainer actions={getActions()} />
            </div>
        </Link>
    );
}


const QuicksilverItemListTileWithDepInj = withServices<IQuicksilverItemWithoutDepInj, IWithDepInj>(
    QuicksilverItemListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const QuicksilverItemListTile = (props: IQuicksilverItemWithoutDepInj, index: number): JSX.Element =>
    <QuicksilverItemListTileWithDepInj {...props} />;