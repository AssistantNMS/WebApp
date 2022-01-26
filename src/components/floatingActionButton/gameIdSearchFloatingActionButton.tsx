import React from 'react';
import i18next from 'i18next';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

interface IProps {
    onClick: () => void;
}

export const GameIdSearchFloatingActionButton: React.FC<IProps> = (props: IProps) => {
    return (
        <BaseFloatingActionButton
            key="GameIdSearchFloatingActionButton"
            keyString="GameIdSearchFloatingActionButton"
            tooltipText={i18next.t(LocaleKey.advancedSearch)}
            icon={<i className="material-icons">code</i>}
            onClick={props.onClick}
        />
    );
}