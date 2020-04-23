import i18next from 'i18next';
import React from 'react';

import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { PlatformType } from '../../contracts/enum/PlatformType';

var SegmentedControl = require('segmented-control');

export const CommunityMissionPresenter: React.FC = () => {
    const title = i18next.t(LocaleKey.communityMission);
    setDocumentTitle(title);

    const changePlatform = (plat: PlatformType) => {
        console.log(plat);
    }

    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            <SegmentedControl.SegmentedControl
                                name="platformChoice"
                                options={[
                                    { label: "PC", value: PlatformType.PC, default: true },
                                    { label: "PS4", value: PlatformType.PS4 },
                                    { label: "XB1", value: PlatformType.XB1 },
                                ]}
                                setValue={changePlatform}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3>{i18next.t(LocaleKey.researchProgress)}</h3>
                        </div>
                        <div className="col-12">
                            <ProgressBar percentage={50} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {
                                i18next.t(LocaleKey.communityMissionContent).split('\n').map((text: string, index: number) => (
                                    <h3 key={`communityMissionContent-${index}`}>
                                        {text}
                                    </h3>
                                ))
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="row justify">
                    </div>
                </div>
            </div>
        </>
    );
}
