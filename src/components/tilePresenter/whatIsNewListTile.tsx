
import * as React from 'react';
import i18next from 'i18next';

import { LocaleKey } from '../../localization/LocaleKey';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';
import { TextContainer } from '../common/tile/textContainer';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { PlatformType } from '../../contracts/generated/AssistantApps/Enum/platformType';
import { formatDate } from '../../helper/dateHelper';
import { platformToString } from '../../helper/platformHelper';

export const WhatIsNewListTile = (version: VersionViewModel, currentWhatIsNewGuid: string) => {
    return (
        <div className="gen-item-container w-full" draggable={false}>
            <div className="gen-item-content-container">
                <TextContainer text={i18next.t(LocaleKey.release).replace('{0}', version.buildName)}
                    additionalCss="m-0-child f-1"
                />
                <div className="quantity-container mb-2">{formatDate(version.activeDate)}</div>
                <div className="quantity-container mb-2">{
                    version.platforms.map((p: PlatformType) => {
                        return (
                            <AdditionalInfoChip
                                key={p}
                                text={platformToString(p)}
                                additionalCss="m-0"
                            />
                        );
                    })
                }</div>
                {
                    (version.guid === currentWhatIsNewGuid) &&
                    <div className="ribbon">Current</div>
                }
            </div>
        </div>
    );
};