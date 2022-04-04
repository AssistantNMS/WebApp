
import i18next from 'i18next';
import React, { } from 'react';
import { AppImage } from '../../../constants/AppImage';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    qsQuantity: string;
}

export const RewardFromQuicksilverTile: React.FC<IProps> = (props: IProps) => {
    const text = i18next.t(LocaleKey.quicksilverPrice);
    return (
        <div data-id="RewardFromTwitchTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.quicksilver} Colour="#2092CC" />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">
                    {props.qsQuantity}
                    <img src="/assets/images/rawMaterials/57.png" alt="Quicksilver" style={{ maxHeight: '20px', marginLeft: '5px' }} />
                </div>
            </div>
        </div>
    );
}