import i18next from 'i18next';
import React from 'react';

import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';

import './nmsfmPresenter.scss';

interface IProps {
}

export const NmsfmPresenter: React.FC<IProps> = (props: IProps) => {

    return (
        <>
            <HeadComponent title={`${i18next.t(LocaleKey.nmsfm)} - ${i18next.t(LocaleKey.nmsfmSubtitle)}`} />
            <NavBar title={`${i18next.t(LocaleKey.nmsfm)} - ${i18next.t(LocaleKey.nmsfmSubtitle)}`} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            <img src="/assets/images/special/nmsfm.png" alt="nmsfm" style={{ width: '100%', maxWidth: '500px' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mt-2 mb-0">{i18next.t(LocaleKey.nmsfm)}</h2>
                            <h3 className="mt-0">{i18next.t(LocaleKey.nmsfmSubtitle)}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul style={{ listStyleType: 'none' }}>
                                <li className="radio-link">
                                    <hr />
                                    <a href="https://zeno.fm/nms-fm/" style={{ textAlign: 'left' }}>
                                        <h4 className="mb-0"><strong>Zeno Radio</strong></h4>
                                        <p>https://zeno.fm/nms-fm/</p>
                                        <i className="material-icons" style={{ fontSize: '2em' }}>open_in_new</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
