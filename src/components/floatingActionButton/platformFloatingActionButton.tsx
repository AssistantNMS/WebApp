import classNames from 'classnames';
import i18next from 'i18next';
import React, { useState } from 'react';
import { AppImage } from '../../constants/AppImage';
import { availableControlPlatforms, IControlPlatformsOptions } from '../../constants/ControlPlatforms';
import { ControllerPlatformType } from '../../contracts/enum/ControllerPlatformType';
import { LocaleKey } from '../../localization/LocaleKey';

import { BaseFloatingActionButton } from './baseFloatingActionButton';

interface IPlatformFabProp {
    key: string;
    value: ControllerPlatformType;
    onClick: (newPlatform: ControllerPlatformType) => void;
}

export const PlatformFloatingActionButton: React.FC<IPlatformFabProp> = (props: IPlatformFabProp) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const optionsAlt = availableControlPlatforms(true);
    const options = availableControlPlatforms(false);

    const toggleDropdown = () => {
        setIsVisible(isVis => !isVis);
    }
    const onOptClick = (opt: IControlPlatformsOptions) => () => {
        props.onClick(opt.value);
        toggleDropdown();
    }

    return (
        <div className="platform-fab">
            <BaseFloatingActionButton
                keyString={props.key}
                tooltipText={i18next.t(LocaleKey.platform)}
                icon={<img style={{ height: '80%', width: '80%' }} src={optionsAlt.find(opt => opt.value === props.value)?.imgUrl ?? AppImage.platformPc} alt="platform" />}
                onClick={toggleDropdown}
            />
            <div className="dropdown">
                <div className={classNames('dropdown-menu dropdown-menu-right noselect', { 'show': isVisible })}>
                    {
                        options.map((opt: IControlPlatformsOptions) => {
                            return (
                                <span key={opt.value} onClick={onOptClick(opt)} className="dropdown-item pointer">
                                    <img className="platform-img" src={opt.imgUrl} alt="platform" />
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}