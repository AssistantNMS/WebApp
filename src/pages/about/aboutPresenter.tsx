import i18next from 'i18next';
import React, { ReactNode, useState } from 'react';
import { AssistantAppsContent } from '../../components/common/about/assistantAppsContent';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { AboutAppContent } from './aboutAppContent';
import { AboutTeamContent } from './aboutTeamContent';
const SegmentedControl = require('segmented-control');

interface IAboutTabs {
    text: string;
    displayFunc: () => ReactNode;
}

export const AboutPresenter: React.FC = () => {
    const options: Array<IAboutTabs> = [
        {
            text: 'AssistantApps',
            displayFunc: () => <AssistantAppsContent />
        },
        {
            text: LocaleKey.about,
            displayFunc: () => <AboutAppContent />
        },
        {
            text: 'Team',
            displayFunc: () => <AboutTeamContent />
        }
    ];

    const [selectedOption, setSelectedOption] = useState<IAboutTabs>(options[0]);
    const title = i18next.t(LocaleKey.about);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row justify">
                        <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <SegmentedControl.SegmentedControl
                                name="aboutTabs"
                                options={options.map((opt) => ({
                                    label: i18next.t(opt.text),
                                    value: opt.text,
                                    default: selectedOption.text === opt.text,
                                }))}
                                setValue={(optText: any) => {
                                    const opt = options.find(o => o.text === optText);
                                    if (opt != null) setSelectedOption(opt);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row justify mb-1em">
                        <div className="col-12">
                            {selectedOption.displayFunc()}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}