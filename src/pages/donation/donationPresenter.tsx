import React from 'react';
import i18next from 'i18next';

import { LocaleKey } from '../../localization/LocaleKey';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';

import { NavBar } from '../../components/core/navbar/navbar';

export const DonationPresenter: React.FC = () => {
    const paymentOptions = [];
    paymentOptions.push({ title: i18next.t(LocaleKey.buyMeACoffee).toString(), event: AnalyticsEvent.externalLinkBuyMeACoffee, url: ExternalUrls.buyMeACoffee, image: '/assets/images/buyMeACoffee.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.patreon).toString(), event: AnalyticsEvent.externalLinkPatreon, url: ExternalUrls.patreon, image: '/assets/images/patreon.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.paypal).toString(), event: AnalyticsEvent.externalLinkPayPal, url: ExternalUrls.payPal, image: '/assets/images/payPal.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.kofi).toString(), event: AnalyticsEvent.externalLinkkofi, url: ExternalUrls.kofi, image: '/assets/images/kofi.png' });
    paymentOptions.push({ title: 'Brave', event: AnalyticsEvent.externalLinkBat, url: ExternalUrls.bat, image: '/assets/images/bat.png' });

    return (
        <>
            <NavBar title={i18next.t(LocaleKey.donation).toString()} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="row">
                        <div className="col-12">
                            <p>{i18next.t(LocaleKey.donationDescrip)}</p>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        {
                            paymentOptions.map((paymentOption: any, index: number) => {
                                return (
                                    <div key={`${paymentOption.title}-${index}`} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                        <a href={paymentOption.url} target="_blank" rel="noopener noreferrer" className="card paymentOption">
                                            <div className="card-header">
                                                <img src={paymentOption.image} alt={paymentOption.title} className="card-header-image" />
                                                <span>{paymentOption.title}</span>
                                            </div>
                                        </a>
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





/*
            <div class="row" style="justify-content: center;"">
            <div v-for=" paymentOption in paymentOptions"
            class="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <a :href="paymentOption.url" target="_blank" rel="noopener norefferer" class="card paymentOption">
                <div class="card-header">
                    <img :src="paymentOption.image" class="card-header-image" />
                    <span>{{paymentOption.title}}</span>
                </div>
            </a>
        </div>


*/