import i18next from 'i18next';
import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
}

export const PatreonPresenter: React.FC<IProps> = (props: IProps) => {
    const title = i18next.t(LocaleKey.patreon);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <assistant-apps-patreon-list>
                        <span slot="loading">
                            <SmallLoading />
                        </span>
                        <span slot="error">
                            <Error />
                        </span>
                    </assistant-apps-patreon-list>
                </div>
            </div>
        </DefaultAnimation>
    );
}
