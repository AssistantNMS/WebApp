
import React from 'react';
import i18next from 'i18next';
import { LocalizationMap } from '../../localization/LocalizationMap';

interface IProps extends LocalizationMap {
    onClick: () => void;
}

export const LanguageListTile: React.FC<IProps> = (props: IProps) => (
    <span onClick={props.onClick} key={props.code} className="dropdown-item pointer">
        <span className={`fi fi-${props.countryCode}`}></span>&nbsp;&nbsp;&nbsp;{i18next.t(props.name)}
    </span>
);
