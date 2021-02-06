import i18next from 'i18next';
import * as React from 'react';
import { LocaleKey } from '../../../localization/LocaleKey';

export const Error = () => {
    return (
        <>
            <div className="content">
                <img src="/assets/images/error.png" alt="error robot" style={{ width: '30%', maxWidth: '500px' }} draggable={false} />
                <h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>
            </div>
        </>
    )
}