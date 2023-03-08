import React from 'react';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { CardButton } from '../../components/common/button/cardButton';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { LocaleKey } from '../../localization/LocaleKey';
import { AppImage } from '../../constants/AppImage';

export const DonationPresenter: React.FC = () => {
    const paymentOptions = [
        {
            title: translate(LocaleKey.buyMeACoffee).toString(),
            event: AnalyticsEvent.externalLinkBuyMeACoffee,
            url: ExternalUrls.buyMeACoffee,
            image: `${AppImage.base()}buyMeACoffee.png`,
        },
        {
            title: translate(LocaleKey.patreon).toString(),
            event: AnalyticsEvent.externalLinkPatreon,
            url: ExternalUrls.patreon,
            image: `${AppImage.base()}patreon.png`,
        },
        {
            title: 'Github Sponsors',
            event: AnalyticsEvent.externalLinkGithubSponsors,
            url: ExternalUrls.githubSponsors,
            image: `${AppImage.base()}githubSponsors.png`,
        },
        {
            title: translate(LocaleKey.paypal).toString(),
            event: AnalyticsEvent.externalLinkPayPal,
            url: ExternalUrls.payPal,
            image: `${AppImage.base()}payPal.png`,
        },
        {
            title: translate(LocaleKey.kofi).toString(),
            event: AnalyticsEvent.externalLinkkofi,
            url: ExternalUrls.kofi,
            image: `${AppImage.base()}kofi.png`,
        },
        {
            title: 'Brave',
            event: AnalyticsEvent.externalLinkBat,
            url: ExternalUrls.bat,
            image: `${AppImage.base()}bat.png`,
        },
        {
            title: translate(LocaleKey.openCollective),
            event: AnalyticsEvent.externalLinkOpenCollective,
            url: ExternalUrls.openCollective,
            image: `${AppImage.base()}openCollective.png`,
        },
    ];

    const title = translate(LocaleKey.donation);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            <h3>{translate(LocaleKey.donationDescrip)}</h3>
                        </div>
                    </div>
                    <div className="row justify">
                        {
                            paymentOptions.map((paymentOption: any, index: number) => {
                                return (
                                    <div key={`${paymentOption.title}-${index}`} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                        <CardButton
                                            title={paymentOption.title}
                                            url={paymentOption.url}
                                            imageUrl={paymentOption.image}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}
