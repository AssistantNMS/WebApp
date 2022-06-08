
import * as React from 'react';

import { TextContainer } from '../common/tile/textContainer';
import { ImageContainer } from '../common/tile/imageContainer';
import { CommunityLinkViewModel } from '../../contracts/generated/Model/Community/communityLinkViewModel';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { AppImage } from '../../constants/AppImage';
import { BasicLink } from '../core/link';

export const CommunityLinkListTile = (props: CommunityLinkViewModel, index: number) => {
    const hasQuantity = props.subtitle.length > 1;
    return (
        <BasicLink key={props.externalUrl + ' ' + index} data-id="ContributorListTile"
            href={props.externalUrl} additionalClassNames="contributor gen-item-container">
            <ImageContainer Name={props.name} Icon={props.iconUrl} IsExternal={true} />
            <div className="gen-item-content-container">
                <TextContainer text={props.name} additionalCss={hasQuantity ? '' : 'full'} />
                {
                    hasQuantity &&
                    <div className="quantity-container">
                        {props.subtitle}
                    </div>
                }
            </div>
        </BasicLink>
    );
}

export const CommunityMissionProgressListTile = () => {
    return (
        <BasicLink key={ExternalUrls.communityMissionProgress} data-id="CommunityMissionProgressListTile"
            href={ExternalUrls.communityMissionProgress} additionalClassNames="contributor gen-item-container">
            <ImageContainer Name="CommunityMissionProgress" Icon={AppImage.communityMissionProgress} />
            <div className="gen-item-content-container">
                <TextContainer text="Community Mission Progress Tracker" />
                <div className="quantity-container">
                    View progress over time
                </div>
            </div>
        </BasicLink>
    );
}
