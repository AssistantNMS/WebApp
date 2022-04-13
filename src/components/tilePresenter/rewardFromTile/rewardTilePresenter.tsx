
import i18next from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppImage } from '../../../constants/AppImage';
import { communityMission } from '../../../constants/Route';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    qsQuantity: string;
}

export const RewardFromQuicksilverTile: React.FC<IProps> = (props: IProps) => {
    const text = i18next.t(LocaleKey.quicksilverCompanion);
    return (
        <Link to={communityMission} data-id="RewardFromQuicksilverTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.quicksilver} Colour="#2092CC" />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">
                    {props.qsQuantity}
                    <img src="/assets/images/rawMaterials/57.png" alt="Quicksilver" style={{ maxHeight: '20px', marginLeft: '5px' }} />
                </div>
            </div>
        </Link>
    );
}