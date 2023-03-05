
import * as React from 'react';

import { TextContainer } from '../common/tile/textContainer';
import { StarshipScrap, StarshipScrapItemDetail } from '../../contracts/data/starshipScrap';
import { starshipScrapClassType, starshipScrapShipClassImage, starshipScrapShipImage, starshipScrapShipType } from './rewardFromTile/rewardFromStarshipScrapPresenter';
import { AppImage } from '../../constants/AppImage';
import { TileLoading } from '../core/loading/loading';
import { GameItemModel } from '../../contracts/GameItemModel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageContainer } from '../common/tile/imageContainer';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { GameItemService } from '../../services/json/GameItemService';
import { catalogueItem } from '../../constants/Route';
import { ActionContainer } from '../common/tile/actionContainer';

interface IProps {
    scrap: StarshipScrap;
    index: number;
    isExpanded: boolean;
    setIsExpanded: (newVal: boolean) => void;
}

export const StarshipScrapListTile: React.FC<IProps> = (props: IProps) => {
    return (
        <div key={props.scrap.ShipType + props.scrap.ShipClassType + ' ' + props.index} data-id="StarshipScrapListTile" className="gen-item-container noselect pointer" draggable={false} onClick={() => props.setIsExpanded(!props.isExpanded)}>
            <div className="image-container starship">
                <img
                    src={AppImage.base + starshipScrapShipImage(props.scrap.ShipType)}
                    alt={props.scrap.ShipType + '-' + props.scrap.ShipClassType}
                    className="ship-type"
                    draggable={false}
                />
                {
                    (starshipScrapShipClassImage(props.scrap.ShipClassType).length > 3) && (
                        <img
                            src={AppImage.base + starshipScrapShipClassImage(props.scrap.ShipClassType)}
                            alt={props.scrap.ShipType + '-' + props.scrap.ShipClassType}
                            className="ship-class"
                            draggable={false}
                        />
                    )
                }
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={starshipScrapShipType(props.scrap.ShipType)} />
                <div className="quantity-container">
                    {starshipScrapClassType(props.scrap.ShipClassType) + ' class'}
                </div>
                <ActionContainer
                    actions={[
                        <i key="expand" onClick={() => props.setIsExpanded(!props.isExpanded)}
                            className="material-icons x2">
                            {props.isExpanded ? 'expand_less' : 'expand_more'}
                        </i>,
                    ]}
                />
            </div>
        </div>
    );
}


interface IStarshipScrapItemDetailListTileWithDepInj {
    gameItemService: GameItemService;
}

interface IStarshipScrapItemDetailListTileWithoutDepInj {
    details: StarshipScrapItemDetail;
    index: number;
}
interface IDetailListProps extends IStarshipScrapItemDetailListTileWithoutDepInj, IStarshipScrapItemDetailListTileWithDepInj { }
export const StarshipScrapItemDetailListTileClass: React.FC<IDetailListProps> = (props: IDetailListProps) => {
    const [item, setItem] = useState<GameItemModel>();

    useEffect(() => {
        fetchData(props.details.Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const itemDetails = await props.gameItemService.getItemDetails(itemId);
        setItem(itemDetails.value);
    }

    if (item == null) {
        return (<TileLoading />);
    }

    let additionalCss = 'full';
    let subtitleText = '';
    let trailingText = '';
    if (props.details.AmountMin !== props.details.AmountMax) {
        subtitleText = props.details.AmountMin + ' => ' + props.details.AmountMax;
        additionalCss = '';
    }
    if (props.details.PercentageChance > 1) {
        if (subtitleText.length < 1) {
            subtitleText = props.details.PercentageChance + ' % chance';
        } else {
            trailingText = props.details.PercentageChance + ' % chance';
        }
        additionalCss = '';
    }

    return (
        <Link to={`${catalogueItem}/${props.details.Id}`} data-id="StarshipScrapItemDetailListTile" className="gen-item-container noselect" draggable={false}>
            <ImageContainer Name={item.Name} Icon={item.Icon} Colour={item.Colour} />
            <div className="gen-item-content-container">
                <TextContainer text={item.Name} additionalCss={additionalCss + ' mr-4'} />
                {
                    (subtitleText.length > 1) && (
                        <div className="quantity-container">
                            {subtitleText}
                        </div>
                    )
                }
                {
                    (trailingText.length > 1) && (
                        <ActionContainer
                            actions={[
                                <span key="trailing" className="mt-5 mr-3" style={{ color: '#bdc6d0' }}>
                                    {trailingText}
                                </span>,
                            ]}
                        />
                    )
                }
            </div>
        </Link>
    );
}


export const StarshipScrapItemDetailListTile = withServices<IStarshipScrapItemDetailListTileWithoutDepInj, IStarshipScrapItemDetailListTileWithDepInj>(
    StarshipScrapItemDetailListTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const StarshipScrapItemDetailListTilePresenter = (
    starship: StarshipScrapItemDetail,
    index: number
): JSX.Element => (
    <StarshipScrapItemDetailListTile
        details={starship}
        index={index}
    />
);