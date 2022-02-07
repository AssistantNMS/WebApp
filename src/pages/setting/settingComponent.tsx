
import classNames from 'classnames';
import i18next from 'i18next';
import React, { ReactNode, useState } from 'react';
import { LanguageListTile } from '../../components/tilePresenter/languageTilePresenter';
import { AppImage } from '../../constants/AppImage';
import { availableControlPlatforms, IControlPlatformsOptions } from '../../constants/ControlPlatforms';
import { availableFonts } from '../../constants/Fonts';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { LocaleKey } from '../../localization/LocaleKey';
import { localeMap } from '../../localization/Localization';
import { LocalizationMap } from '../../localization/LocalizationMap';

interface IBoolSettingProps {
    title: string;
    value: boolean;
    onClick: (newValue: boolean) => void;
}
export const BoolSettingTile: React.FC<IBoolSettingProps> = (props: IBoolSettingProps) => {
    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall" onChange={() => props.onClick(!props.value)}>
            <div className="card  pointer" style={{ padding: '1em' }}>
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

interface IDropDownSettingContentProp {
    isVisible: boolean;
    options: Array<IDropDownOptionProp>;
    onClick: (newValue: string) => void;
}

export const DropDownSettingContent: React.FC<IDropDownSettingContentProp> = (props: IDropDownSettingContentProp) => {
    return (
        <div className={classNames('dropdown-menu dropdown-menu-right noselect', { 'show': props.isVisible })}>
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
    );
}


interface IBaseDropDownSettingProp {
    title: string;
    value: string;
    optionsRenderer: (dropDownIsVisible: boolean) => ReactNode;
}

export const BaseDropDownSettingTile: React.FC<IBaseDropDownSettingProp> = (props: IBaseDropDownSettingProp) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall" onClick={toggleDropdown}>
            {
                isVisible
                    ? <div className="full-page-loader"></div>
                    : null
            }
            <div className="card pointer" style={{ padding: '1em' }}>
                <div className="form-check">
                    <label className="form-check-label custom">
                        <p>{props.title}:</p>&nbsp;
                        <p className="secondary-highlight">{props.value}</p>
                    </label>
                </div>
                <div className="dropdown">
                    {props.optionsRenderer(isVisible)}
                </div>
            </div>
        </div>
    );
}

interface IDropDownSettingProp {
    title: string;
    value: string;
    options: Array<IDropDownOptionProp>;
    onClick: (newValue: string) => void;
}

export const DropDownSettingTile: React.FC<IDropDownSettingProp> = (props: IDropDownSettingProp) => {
    return (
        <BaseDropDownSettingTile
            title={props.title}
            value={props.options.find(opt => opt.value === props.value)?.title ?? 'Unknown'}
            optionsRenderer={(dropDownIsVisible: boolean) => (
                <DropDownSettingContent
                    isVisible={dropDownIsVisible}
                    options={props.options}
                    onClick={props.onClick}
                />
            )}
        />
    );
}

interface ILangProp {
    title: string;
    value: string;
    onClick: (locale: LocalizationMap) => void;
}

export const LangSettingTile: React.FC<ILangProp> = (props: ILangProp) => {
    return (
        <BaseDropDownSettingTile
            title={props.title}
            value={i18next.t(localeMap.find(opt => opt.code === props.value)?.name ?? LocaleKey.unknown)}
            optionsRenderer={(dropDownIsVisible: boolean) => (
                <div className={classNames('dropdown-menu dropdown-menu-right noselect', { 'show': dropDownIsVisible })}>
                    {
                        localeMap.map((locale: LocalizationMap) => (
                            <LanguageListTile
                                key={`${locale.countryCode}-${locale.code}`}
                                onClick={() => props.onClick(locale)} {...locale}
                            />
                        ))
                    }
                </div>
            )}
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
        <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12-xsmall pointer" onClick={toggleDropdown}>
            {
                isVisible
                    ? <div className="full-page-loader"></div>
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
                    <div className={classNames('dropdown-menu dropdown-menu-right noselect', { 'show': isVisible })}>
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
