
import * as React from 'react';

import { TextContainer } from '../common/tile/textContainer';
import { ImageContainer } from '../common/tile/imageContainer';
import { CommunityLinkViewModel } from '../../contracts/generated/Model/Community/communityLinkViewModel';

export const CommunityLinkListTile = (props: CommunityLinkViewModel, index: number) => {
    const hasQuantity = props.subtitle.length > 1;
    return (
        <a key={props.externalUrl + ' ' + index} data-id="ContributorListTile"
            href={props.externalUrl} target="_blank" rel="noopener noreferrer"
            className="contributor gen-item-container" draggable={false}>
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
        </a>
    );
}
