import i18next from 'i18next';
import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const CartFloatingActionButton = (addThisItemToCart: any) => {
    return (
        <BaseFloatingActionButton
            keyString="CartFloatingActionButton"
            tooltipText={i18next.t(LocaleKey.cart)}
            icon={<i className="material-icons">shopping_basket</i>}
            onClick={addThisItemToCart}
        />
    );
}