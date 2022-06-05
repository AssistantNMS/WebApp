import React, { } from 'react';
import { translate } from '../../../localization/Translate';
import { AppImage } from '../../../constants/AppImage';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    campaignId: string;
}

export const RewardFromTwitchTile: React.FC<IProps> = (props: IProps) => {
    const text = translate(LocaleKey.twitchCampaignNum).replace('{0}', props.campaignId);
    const descrip = translate(LocaleKey.twitchDrop);
    return (
        <div data-id="RewardFromTwitchTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.twitch} />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">{descrip}</div>
            </div>
        </div>
    );
}