import React from 'react';
import { translate } from '../../localization/Translate';
import { CardButton } from '../../components/common/button/cardButton';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { LocaleKey } from '../../localization/LocaleKey';

export const AboutAppContent: React.FC = () => {
    const buttons = [
        { title: translate(LocaleKey.kurtsBlog), event: AnalyticsEvent.externalLinkPersonalBlog, url: ExternalUrls.personalBlog },
        { title: 'Kurt Lourens', event: AnalyticsEvent.externalLinkCVWebsite, url: ExternalUrls.cvWebsite },
        { title: translate(LocaleKey.github), event: AnalyticsEvent.externalLinkGitHubGeneral, url: ExternalUrls.githubGeneralRepo }
    ];
    return (
        <>
            <div className="row">
                <div className="col-12">
                    {
                        translate(LocaleKey.aboutContent).split('\n').map((text: string, index: number) => (
                            <h3 key={`about-${index}`}>
                                {text}
                            </h3>
                        ))
                    }
                </div>
            </div>
            <div className="row justify mb-2em">
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
        </>
    );
}