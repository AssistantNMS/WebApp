import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const ShareFloatingActionButton = (openShareDialog: () => void) => {
  return (
    <BaseFloatingActionButton
      key="ShareFloatingActionButton"
      keyString="ShareFloatingActionButton"
      tooltipText={translate(LocaleKey.share)}
      icon={<i className="material-icons">share</i>}
      onClick={openShareDialog}
    />
  );
};
