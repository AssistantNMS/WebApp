
import React, { useState } from 'react';
import classNames from 'classnames';
import { LocalizationMap } from '../../localization/LocalizationMap';
import { localeMap } from '../../localization/Localization';
import { availableFonts } from '../../constants/Fonts';
import { availableControlPlatforms, IControlPlatformsOptions } from '../../constants/ControlPlatforms';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { AppImage } from '../../constants/AppImage';

interface IBoolSettingProps {
    title: string;
    value: boolean;
    onClick: (newValue: boolean) => void;
}
export const BoolSettingTile: React.FC<IBoolSettingProps> = (props: IBoolSettingProps) => {
    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall" onChange={() => props.onClick(!props.value)}>
            <div className="card" style={{ padding: '1em' }}>
                <div className="form-check">
                    <label className="form-check-label custom">
                        <input className="form-check-input" type="checkbox" readOnly checked={props.value} />
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                        {props.title}
                    </label>
                </div>
            </div>
        </div>
    );
}

interface IDropDownOptionProp {
    title: string;
    value: string;
}

interface IDropDownSettingProp {
    title: string;
    value: string;
    options: Array<IDropDownOptionProp>;
    onClick: (newValue: string) => void;
}

export const DropDownSettingTile: React.FC<IDropDownSettingProp> = (props: IDropDownSettingProp) => {
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
                        <p>{props.title}:</p>&nbsp;
                        <p className="secondary-highlight">{props.options.find(opt => opt.value === props.value)?.title ?? 'Unknown'}</p>
                    </label>
                </div>
                <div className="dropdown">
                    <div className={classNames('dropdown-menu', { 'show': isVisible })}>
                        {
                            props.options.map((opt: IDropDownOptionProp) => {
                                return (
                                    <span onClick={() => props.onClick(opt.value)} key={opt.value}
                                        className="dropdown-item pointer">{opt.title}
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

interface ILangProp {
    title: string;
    value: string;
    onClick: (newValue: string) => void;
}

export const LangSettingTile: React.FC<ILangProp> = (props: ILangProp) => {
    return (
        <DropDownSettingTile
            title={props.title}
            value={props.value}
            options={localeMap.map((locale: LocalizationMap) => ({
                title: locale.name,
                value: locale.code,
            }))}
            onClick={props.onClick}
        />
    );
}

interface IFontProp {
    title: string;
    value: string;
    onClick: (newValue: string) => void;
}

export const FontSettingTile: React.FC<IFontProp> = (props: IFontProp) => {
    return (
        <DropDownSettingTile
            title={props.title}
            value={props.value}
            options={availableFonts()}
            onClick={props.onClick}
        />
    );
}


interface IControlPlatformProp {
    title: string;
    value: ControllerPlatformType;
    onClick: (newValue: ControllerPlatformType) => void;
}

export const ControlPlatformSettingTile: React.FC<IControlPlatformProp> = (props: IControlPlatformProp) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    }

    const options = availableControlPlatforms();

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
                        <p>{props.title}:</p>&nbsp;
                        <img className="platform-img" src={options.find(opt => opt.value === props.value)?.imgUrl ?? AppImage.platformPc} alt="platform" />
                    </label>
                </div>
                <div className="dropdown">
                    <div className={classNames('dropdown-menu', { 'show': isVisible })}>
                        {
                            options.map((opt: IControlPlatformsOptions) => {
                                return (
                                    <span onClick={() => props.onClick(opt.value)} key={opt.value} className="dropdown-item pointer">
                                        <img className="platform-img" src={opt.imgUrl} alt="platform" />
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
