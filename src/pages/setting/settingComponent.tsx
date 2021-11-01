
import React, { useState } from 'react';
import classNames from 'classnames';
import { LocalizationMap } from '../../localization/LocalizationMap';
import { localeMap } from '../../localization/Localization';

export const boolSettingTile = (title: string, value: boolean, onClick: (newValue: boolean) => void) => {
    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall" onChange={() => onClick(!value)}>
            <div className="card" style={{ padding: '1em' }}>
                <div className="form-check">
                    <label className="form-check-label custom">
                        <input className="form-check-input" type="checkbox" readOnly checked={value} />
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                        {title}
                    </label>
                </div>
            </div>
        </div>
    );
}

interface ILangProp {
    title: string;
    value: string;
    onClick: (newValue: string) => void;
}

export const LangSettingTile: React.FC<ILangProp> = (props: ILangProp) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall" onClick={toggleDropdown}>
            {
                isVisible
                    ? <div className="full-page-loader opacity80"></div>
                    : null
            }
            <div className="card" style={{ padding: '1em' }}>
                <div className="form-check">
                    <label className="form-check-label custom">
                        {props.title}: {localeMap.find(lm => lm.code === props.value)?.name ?? 'Unknown'}
                    </label>
                </div>
                <div className="dropdown">
                    <div className={classNames('dropdown-menu', { 'show': isVisible })}>
                        {
                            localeMap.map((locale: LocalizationMap) => {
                                return (
                                    <span onClick={() => props.onClick(locale.code)} key={locale.code}
                                        className="dropdown-item pointer">{locale.name}
                                    </span>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
