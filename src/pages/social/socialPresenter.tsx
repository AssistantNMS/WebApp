import i18next from 'i18next';
import React from 'react';
import { CardButton } from '../../components/core/button/cardButton';
import { NavBar } from '../../components/core/navbar/navbar';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import * as socialJson from '../../assets/data/social.json';

export const SocialPresenter: React.FC = () => {
    const socials = (socialJson as any).default;

    const title = i18next.t(LocaleKey.social);
    setDocumentTitle(title);
    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row justify">
                        {
                            socials.map((social: any, index: number) => {
                                return (
                                    <div key={`${social.name}-${index}`} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                        <CardButton
                                            title={social.name}
                                            url={social.link}
                                            imageUrl={`/assets/images/${social.icon}`}
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
