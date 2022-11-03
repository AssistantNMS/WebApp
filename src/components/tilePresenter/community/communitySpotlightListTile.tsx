
import * as React from 'react';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { BasicLink } from '../../core/link';
import { CommunitySpotlightViewModel } from '../../../contracts/generated/Model/Community/communitySpotlightViewModel';

export const CommunitySpotlightListTile = (props: CommunitySpotlightViewModel, index: number) => {
    const hasQuantity = props.subtitle.length > 1;
    return (
        <BasicLink key={props.externalUrl + ' ' + index} data-id="CommunitySpotlightListTile"
            href={props.externalUrl} additionalClassNames="community-spotlight gen-item-container">
            <ImageContainer Name={props.title} Icon={props.previewImageUrl} IsExternal={true} />
            <div className="gen-item-content-container">
                <TextContainer text={props.title} additionalCss={hasQuantity ? '' : 'full'} />
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