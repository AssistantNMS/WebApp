import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const CartFloatingActionButton = (addThisItemToCart: any) => {
    return (
        <BaseFloatingActionButton
            key="CartFloatingActionButton"
            keyString="CartFloatingActionButton"
            tooltipText={translate(LocaleKey.cart)}
            icon={<i className="material-icons">shopping_basket</i>}
            onClick={addThisItemToCart}
        />
    );
}