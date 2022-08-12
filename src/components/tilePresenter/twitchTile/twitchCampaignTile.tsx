import * as React from 'react';

import { Link } from 'react-router-dom';
import { AppImage } from '../../../constants/AppImage';
import * as route from '../../../constants/Route';
import { TwitchDrop } from '../../../contracts/data/twitchDrop';
import { twitchDate } from '../../../helper/dateHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';

export const TwitchCampaignTile = (props: TwitchDrop, index: number) => {
    return (
        <Link key={props.Id + ' ' + index} data-id="TwitchCampaignTile" className="gen-item-container"
            to={route.twitchDropsDetails.replaceAll(route.twitchDropsParam, props.Id.toString())}>
            <ImageContainer Name="TwitchDrop" Icon={AppImage.twitch} />
            <div className="gen-item-content-container">
                <TextContainer text={translate(LocaleKey.twitchCampaignNum).replaceAll('{0}', props.Id.toString())} />
                <div className="quantity-container">
                    {twitchDate(props.StartDate)} -&gt; {twitchDate(props.StartDate)}
                </div>
            </div>
        </Link>
    );
}