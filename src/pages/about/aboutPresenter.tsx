import React from 'react';
import i18next from 'i18next';

import { LocaleKey } from '../../localization/LocaleKey';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';

import { NavBar } from '../../components/core/navbar/navbar';
import { CardButton } from '../../components/core/button/cardButton';

export const AboutPresenter: React.FC = () => {
    const buttons = [
        { title: i18next.t(LocaleKey.kurtsBlog), event: AnalyticsEvent.externalLinkPersonalBlog, url: ExternalUrls.personalBlog },
        { title: 'Kurt Lourens', event: AnalyticsEvent.externalLinkCVWebsite, url: ExternalUrls.cvWebsite },
        { title: i18next.t(LocaleKey.github), event: AnalyticsEvent.externalLinkGitHubGeneral, url: ExternalUrls.githubGeneralRepo }
    ];
    return (
        <>
            <NavBar title={i18next.t(LocaleKey.about)} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="row">
                        <div className="col-12">
                            <p>{i18next.t(LocaleKey.aboutContent)}</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            buttons.map((button) => {
                                return (
                                    <div className="col-12" key={button.title}>
                                        <CardButton
                                            title={button.title}
                                            url={button.url}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}