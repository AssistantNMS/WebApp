import React from 'react';
import { translate } from '../../localization/Translate';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const NameFloatingActionButton = (getPlayerName: any) => {
    return (
        <BaseFloatingActionButton
            key="NameFloatingActionButton"
            keyString="NameFloatingActionButton"
            tooltipText={translate(LocaleKey.playerName)}
            icon={<i className="material-icons">edit</i>}
            onClick={getPlayerName}
        />
    );
}