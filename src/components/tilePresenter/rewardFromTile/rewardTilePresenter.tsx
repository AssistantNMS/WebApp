import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from '../../../localization/Translate';
import { AppImage } from '../../../constants/AppImage';
import { communityMission } from '../../../constants/Route';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    qsQuantity: string;
}

export const RewardFromQuicksilverTile: React.FC<IProps> = (props: IProps) => {
    const text = translate(LocaleKey.quicksilverCompanion);
    return (
        <Link to={communityMission} data-id="RewardFromQuicksilverTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.quicksilver()} Colour="#2092CC" />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">
                    {props.qsQuantity}
                    <img src={AppImage.quicksilverForChips()} alt="Quicksilver" style={{ maxHeight: '20px', marginLeft: '5px' }} />
                </div>
            </div>
        </Link>
    );
}