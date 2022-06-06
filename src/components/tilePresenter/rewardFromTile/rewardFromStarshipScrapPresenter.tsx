import React from 'react';
import { Link } from 'react-router-dom';
import { AppImage } from '../../../constants/AppImage';
import * as route from '../../../constants/Route';
import { StarshipScrap } from '../../../contracts/data/starshipScrap';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    itemId: string;
    starshipScrapItems: Array<StarshipScrap>;
}

export const RewardFromStarshipScrapTile: React.FC<IProps> = (props: IProps) => {
    const subtitle = starshipScrapHeading(props.starshipScrapItems[0]);
    return (
        <Link to={route.starshipScrap} data-id="RewardFromStarshipScrapTile" key={`starship-scrap-${props.itemId}`} className="gen-item-container" draggable={false}>
            <ImageContainer Name="starshipScrap" Icon={AppImage.starshipScrap} />
            <div className="gen-item-content-container">
                <TextContainer text={translate(LocaleKey.starshipScrap)} />
                <div className="quantity-container">{subtitle}</div>
            </div>
        </Link>
    );
}

const starshipScrapHeading = (starshipScrap: StarshipScrap): string => {
    let subtitle = translate(LocaleKey.unknown);
    if (starshipScrap?.ShipClassType != null && starshipScrap?.ShipType != null) {
        if (starshipScrap.ShipType === 'Any') {
            subtitle = translate(LocaleKey.starshipScrapAny);
        } else {
            const type: string = starshipScrapShipType(starshipScrap.ShipType);
            const classType: string = starshipScrapShipType(starshipScrap.ShipClassType);
            subtitle = `${type}- ${classType}`;
        }
    }
    return subtitle;
}

export const starshipScrapShipType = (shipType: string): string => {
    let subtitle = '';
    if (shipType != null) {
        subtitle = shipType;
        if (shipType === 'Any') {
            subtitle = translate(LocaleKey.starshipScrapAny);
        }
    }
    if (subtitle === 'Science') subtitle = 'Explorer';
    return subtitle;
}

export const starshipScrapClassType = (shipClassType: string): string => {
    let subtitle = '';
    if (shipClassType != null) {
        subtitle = shipClassType;
        if (shipClassType === 'Unknown') {
            subtitle = translate(LocaleKey.starshipScrapAny);
        }
    }
    return subtitle;
}

export const starshipScrapShipImage = (shipType: string): string => {
    let icon = AppImage.starshipScrap;
    if (shipType != null) {
        if (shipType === 'Fighter') icon = 'other/162.png';
        if (shipType === 'Science') icon = 'other/129.png';
        if (shipType === 'Hauler') icon = 'other/132.png';
        if (shipType === 'Shuttle') icon = 'other/158.png';
    }
    return icon;
}

export const starshipScrapShipClassImage = (shipClassType: string): string => {
    let icon: string = '';
    if (shipClassType != null) {
        if (shipClassType === 'S') icon = AppImage.sclass;
        if (shipClassType === 'A') icon = AppImage.aclass;
        if (shipClassType === 'B') icon = AppImage.bclass;
        if (shipClassType === 'C') icon = AppImage.cclass;
    }
    return icon;
}