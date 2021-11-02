import i18next from 'i18next';
import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const FavouriteFloatingActionButton = (itemIsFavourited: boolean, addThisItemToFavourites: () => void, removeThisItemToFavourites: () => void) => {
    const iconString = itemIsFavourited ? 'star' : 'star_border';
    let onClick = itemIsFavourited ? removeThisItemToFavourites : addThisItemToFavourites;
    return (
        <BaseFloatingActionButton
            keyString="FavouriteFloatingActionButton"
            tooltipText={i18next.t(LocaleKey.favourites)}
            icon={<i className="material-icons">{iconString}</i>}
            onClick={onClick}
        />
    );
}