import i18next from 'i18next';
import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const NameFloatingActionButton = (getPlayerName: any) => {
    return (
        <BaseFloatingActionButton
            key="NameFloatingActionButton"
            keyString="NameFloatingActionButton"
            tooltipText={i18next.t(LocaleKey.playerName)}
            icon={<i className="material-icons">edit</i>}
            onClick={getPlayerName}
        />
    );
}