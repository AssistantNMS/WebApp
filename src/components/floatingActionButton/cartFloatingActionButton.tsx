import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';
import { OnClickEvent } from '../../helper/typescriptHacks';

export const CartFloatingActionButton = (addThisItemToCart: (e: OnClickEvent) => void) => {
  return (
    <BaseFloatingActionButton
      key="CartFloatingActionButton"
      keyString="CartFloatingActionButton"
      tooltipText={translate(LocaleKey.cart)}
      icon={<i className="material-icons">shopping_basket</i>}
      onClick={addThisItemToCart}
    />
  );
};
