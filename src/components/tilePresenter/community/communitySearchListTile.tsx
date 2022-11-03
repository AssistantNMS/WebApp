
import * as React from 'react';

import { CommunitySearchViewModel } from '../../../contracts/other/communitySearchViewModel';
import { CommunitySearchChipColourViewModel } from '../../../contracts/other/communitySearchChipColourViewModel';
import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';
import { communitySearchTags } from './communitySearchTags';

export const CommunitySearchListTile = (
    chipColours: Array<CommunitySearchChipColourViewModel>,
    setSelectedItem: (item: CommunitySearchViewModel) => void,
) =>
    (props: CommunitySearchViewModel, index: number) => {


        return (
            <div key={props.links[0] + ' ' + index} data-id="CommunitySearchListTile" className="community-search-card-bg noselect" onClick={() => setSelectedItem(props)}>
                <div className="community-search-card pointer">
                    <div className="community-search-top">
                        <div className="community-icon">
                            <LazyLoadImage
                                src={`https://community.nmscd.com${props.icon}`}
                                alt={props.name ?? props.icon}
                                draggable={false}
                            />
                        </div>
                        <div className="community-search-title">
                            <div className="community-search-title-content">{props.name}</div>
                        </div>
                    </div>
                    <div className="community-search-desc-center">
                        <div className="community-search-desc">{props.desc}</div>
                    </div>
                    <div className="community-search-tags">
                        {communitySearchTags(chipColours, props.tags)}
                    </div>
                </div>
            </div>
        );
    }