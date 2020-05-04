import React from 'react';

import { Fab } from '@material/react-fab'

export const FavouriteFloatingActionButton = (itemIsFavourited: boolean, addThisItemToFavourites: any, removeThisItemToFavourites: any) => {
    const iconString = itemIsFavourited ? 'star' : 'star_border';
    let onClick = itemIsFavourited ? removeThisItemToFavourites : addThisItemToFavourites;
    return (
        <Fab className="fab-bg-color fab-margin"
            key="FavouriteFloatingActionButton"
            icon={<i className="material-icons">{iconString}</i>}
            onClick={onClick}
        />
    );
}