import React from 'react';
import { translate } from '../../localization/Translate';
import { LocalizationMap } from '../../localization/LocalizationMap';

interface IProps extends LocalizationMap {
  onClick: () => void;
}

export const LanguageListTile: React.FC<IProps> = (props: IProps) => (
  <span onClick={props.onClick} key={props.code} className="dropdown-item pointer">
    <span className={`fi fi-${props.countryCode}`}></span>&nbsp;&nbsp;&nbsp;
    {translate(props.name)}
  </span>
);
