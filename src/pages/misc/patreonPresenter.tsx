import i18next from 'i18next';
import React from 'react';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
}

export const PatreonPresenter: React.FC<IProps> = (props: IProps) => {
    const title = i18next.t(LocaleKey.patreon);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <assistant-apps-patreon-list />
                </div>
            </div>
        </>
    );
}
