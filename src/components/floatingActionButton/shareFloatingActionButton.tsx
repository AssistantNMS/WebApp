import i18next from 'i18next';
import React from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

export const ShareFloatingActionButton = (openShareDialog: () => void) => {
    return (
        <BaseFloatingActionButton
            key="ShareFloatingActionButton"
            keyString="ShareFloatingActionButton"
            tooltipText={i18next.t(LocaleKey.share)}
            icon={<i className="material-icons">share</i>}
            onClick={openShareDialog}
        />
    );
}