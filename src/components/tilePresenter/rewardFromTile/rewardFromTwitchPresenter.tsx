
import i18next from 'i18next';
import React, { } from 'react';
import { AppImage } from '../../../constants/AppImage';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    campaignId: string;
}

export const RewardFromTwitchTile: React.FC<IProps> = (props: IProps) => {
    const text = i18next.t(LocaleKey.twitchCampaignNum).replace('{0}', props.campaignId);
    return (
        <div data-id="RewardFromTwitchTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.twitch} />
            <div className="gen-item-content-container">
                <TextContainer text={text} additionalCss={"full"} />
            </div>
        </div>
    );
}