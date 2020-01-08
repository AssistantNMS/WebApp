import React from 'react';
import i18next from 'i18next';

import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';

export const LanguagePresenter: React.FC = () => {
    const buttons = [
        { title: i18next.t(LocaleKey.email), event: AnalyticsEvent.externalLinkKurtLourensEmail, url: ExternalUrls.kurtLourensEmail },
        { title: i18next.t(LocaleKey.github), event: AnalyticsEvent.externalLinkGitHubLanguage, url: ExternalUrls.githubLanguageRepo }
    ];
    return (
        <>
            <NavBar title={i18next.t(LocaleKey.language)} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="row">
                        <div className="col-12">
                            <p>{i18next.t(LocaleKey.languageContent)}</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            buttons.map((button) => {
                                return (
                                    <div className="col-12" key={button.title}>
                                        <a href={button.url} target="_blank" rel="noopener noreferrer">{button.title}</a>
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