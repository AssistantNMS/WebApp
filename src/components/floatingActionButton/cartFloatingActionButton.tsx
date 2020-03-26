import React from 'react';

import { Fab } from '@material/react-fab'

export const CartFloatingActionButton = (addThisItemToCart: any) => {
    return (
        <Fab className="fab-bg-color"
            key="CartFloatingActionButton"
            icon={<i className="material-icons">shopping_basket</i>}
            onClick={addThisItemToCart}
        />
    );
}