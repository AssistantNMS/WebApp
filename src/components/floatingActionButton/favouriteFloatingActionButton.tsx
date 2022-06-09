import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const FavouriteFloatingActionButton = (itemIsFavourited: boolean, addThisItemToFavourites: () => void, removeThisItemToFavourites: () => void) => {
    const iconString = itemIsFavourited ? 'star' : 'star_border';
    let onClick = itemIsFavourited ? removeThisItemToFavourites : addThisItemToFavourites;
    return (
        <BaseFloatingActionButton
            key="FavouriteFloatingActionButton"
            keyString="FavouriteFloatingActionButton"
            tooltipText={translate(LocaleKey.favourites)}
            icon={<i className="material-icons">{iconString}</i>}
            onClick={onClick}
        />
    );
}