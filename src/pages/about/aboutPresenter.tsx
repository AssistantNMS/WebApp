import i18next from 'i18next';
import React from 'react';
import { CardButton } from '../../components/common/button/cardButton';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { LocaleKey } from '../../localization/LocaleKey';



export const AboutPresenter: React.FC = () => {
    const buttons = [
        { title: i18next.t(LocaleKey.kurtsBlog), event: AnalyticsEvent.externalLinkPersonalBlog, url: ExternalUrls.personalBlog },
        { title: 'Kurt Lourens', event: AnalyticsEvent.externalLinkCVWebsite, url: ExternalUrls.cvWebsite },
        { title: i18next.t(LocaleKey.github), event: AnalyticsEvent.externalLinkGitHubGeneral, url: ExternalUrls.githubGeneralRepo }
    ];
    const title = i18next.t(LocaleKey.about);

    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            {
                                i18next.t(LocaleKey.aboutContent).split('\n').map((text: string, index: number) => (
                                    <h3 key={`about-${index}`}>
                                        {text}
                                    </h3>
                                ))
                            }
                        </div>
                    </div>
                    <div className="row justify">
                        {
                            buttons.map((button) => {
                                return (
                                    <div key={button.title} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                        <CardButton
                                            className="center"
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