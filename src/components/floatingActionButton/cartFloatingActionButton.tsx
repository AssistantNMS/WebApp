import React from 'react';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const CartFloatingActionButton = (addThisItemToCart: any) => {
    return (
        <BaseFloatingActionButton
            key="CartFloatingActionButton"
            icon={<i className="material-icons">shopping_basket</i>}
            onClick={addThisItemToCart}
        />
    );
}