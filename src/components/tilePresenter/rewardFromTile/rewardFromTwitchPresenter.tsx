import React from 'react';
import { Link } from 'react-router-dom';
import { AppImage } from '../../../constants/AppImage';
import * as route from '../../../constants/Route';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

interface IProps {
    campaignId: string;
}

export const RewardFromTwitchTile: React.FC<IProps> = (props: IProps) => {
    const text = translate(LocaleKey.twitchCampaignNum).replace('{0}', props.campaignId);
    const descrip = translate(LocaleKey.twitchDrop);
    const url = route.twitchDropsDetails.replaceAll(route.twitchDropsParam, props.campaignId);

    return (
        <Link to={url} data-id="RewardFromTwitchTile" key={`twitch-${props.campaignId}`} className="gen-item-container" draggable={false}>
            <ImageContainer Name="Twitch" Icon={AppImage.twitch()} />
            <div className="gen-item-content-container">
                <TextContainer text={text} />
                <div className="quantity-container">{descrip}</div>
            </div>
        </Link>
    );
}