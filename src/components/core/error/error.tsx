import * as React from 'react';
import { translate } from '../../../localization/Translate';
import { LocaleKey } from '../../../localization/LocaleKey';

export const Error = () => {
    return (
        <>
            <div className="content">
                <img src="/assets/images/error.png" alt="error robot" style={{ width: '30%', maxWidth: '500px' }} draggable={false} />
                <h2 className="pt1">{translate(LocaleKey.somethingWentWrong)}</h2>
            </div>
        </>
    )
}