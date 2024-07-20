import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';
import { OnClickEvent } from '../../helper/typescriptHacks';

export const NameFloatingActionButton = (getPlayerName: (e: OnClickEvent) => void) => {
  return (
    <BaseFloatingActionButton
      key="NameFloatingActionButton"
      keyString="NameFloatingActionButton"
      tooltipText={translate(LocaleKey.playerName)}
      icon={<i className="material-icons">edit</i>}
      onClick={getPlayerName}
    />
  );
};
