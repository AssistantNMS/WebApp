import React from 'react';
import i18next from 'i18next';
import { LocaleKey } from '../../../localization/LocaleKey';

import './positiveButton.scss';

interface IProps {
    onClick?: () => void;
}

export const PositiveButton: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <div className="customButton" onClick={props.onClick}>
                <i className="material-icons">chat</i>
                <span>{i18next.t(LocaleKey.readConversation).toString()}</span>
            </div>
        </>
    );
}