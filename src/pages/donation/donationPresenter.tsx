import i18next from 'i18next';
import React from 'react';
import { CardButton } from '../../components/core/button/cardButton';
import { NavBar } from '../../components/core/navbar/navbar';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';



export const DonationPresenter: React.FC = () => {
    const paymentOptions = [];
    paymentOptions.push({ title: i18next.t(LocaleKey.buyMeACoffee).toString(), event: AnalyticsEvent.externalLinkBuyMeACoffee, url: ExternalUrls.buyMeACoffee, image: '/assets/images/buyMeACoffee.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.patreon).toString(), event: AnalyticsEvent.externalLinkPatreon, url: ExternalUrls.patreon, image: '/assets/images/patreon.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.paypal).toString(), event: AnalyticsEvent.externalLinkPayPal, url: ExternalUrls.payPal, image: '/assets/images/payPal.png' });
    paymentOptions.push({ title: i18next.t(LocaleKey.kofi).toString(), event: AnalyticsEvent.externalLinkkofi, url: ExternalUrls.kofi, image: '/assets/images/kofi.png' });
    paymentOptions.push({ title: 'Brave', event: AnalyticsEvent.externalLinkBat, url: ExternalUrls.bat, image: '/assets/images/bat.png' });

    const title = i18next.t(LocaleKey.donation);
    setDocumentTitle(title);
    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            <h3>{i18next.t(LocaleKey.donationDescrip)}</h3>
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