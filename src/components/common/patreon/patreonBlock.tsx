import React, { useState } from 'react';

import { AppImage } from '../../../constants/AppImage';
import { localStorageKey, validCodes } from '../../../constants/Patreon';
import { simpleHash } from '../../../helper/hashHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';

interface IProps {
    children: JSX.Element;
    dateAvailable: Date;
    hideBlocker?: boolean;
}

export const PatreonBlock: React.FC<IProps> = (props: IProps) => {
    const savedCode = localStorage.getItem(localStorageKey) ?? '';
    const [password, setPassword] = useState<string>(savedCode);

    const now = new Date();
    if (now > props.dateAvailable) return props.children;
    if (validCodes.includes(savedCode)) return props.children;

    const onTextChange = (value: string) => {
        setPassword(value);

        const hashedValue = simpleHash({ hash: value });
        console.log(value, hashedValue)
        if (validCodes.includes(hashedValue) == false) return;

        localStorage.setItem(localStorageKey, hashedValue);
    }

    const getFriendlyTimeLeft = (millisecondsLeft: number) => {
        if (millisecondsLeft <= 0) {
            return translate(LocaleKey.completed);
        }

        const seconds = millisecondsLeft / 1000;
        if (seconds < 1) return translate(LocaleKey.completed);
        if (seconds < 60) {
            return translate(LocaleKey.seconds)
                .replaceAll('{0}', seconds.toFixed(0));
        }

        const minutes = seconds / 60;
        if (minutes < 1) {
            return translate(LocaleKey.seconds)
                .replaceAll('{0}', seconds.toFixed(0));
        }
        if (minutes < 60) {
            return translate(LocaleKey.minutes)
                .replaceAll('{0}', minutes.toFixed(0));
        }

        const hours = minutes / 60;
        if (hours < 1) {
            return translate(LocaleKey.minutes)
                .replaceAll('{0}', minutes.toFixed(0));
        }
        if (hours < 60) {
            return translate(LocaleKey.hours)
                .replaceAll('{0}', hours.toFixed(0));
        }

        const days = hours / 24;
        if (days < 1) {
            return translate(LocaleKey.hours)
                .replaceAll('{0}', hours.toFixed(0));
        }
        return translate(LocaleKey.days)
            .replaceAll('{0}', days.toFixed(0));
    }

    if (props.hideBlocker == true) {
        return (<span></span>);
    }

    return (
        <div className="patreon-block-container">
            <div className="patreon-notice">
                <div className="card">
                    <img src={AppImage.patreon} alt="Patreon" />
                    <h2 className="mt-3 mb-0">{translate(LocaleKey.featureNotAvailable)}</h2>
                    <h3>{translate(LocaleKey.featureNotAvailableDescrip).replace('{0}', getFriendlyTimeLeft(props.dateAvailable.getTime() - (new Date()).getTime()))}</h3>
                    <input className="form-control ta-center" type="text" placeholder='Enter secret code' value={password} onInput={e => onTextChange((e.target as any).value)} />
                </div>
            </div>
        </div>
    );
};
