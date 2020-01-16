import React from 'react';
import i18next from 'i18next';

import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';

export const CatalogueItemPresenter: React.FC = () => {

    return (
        <>
            <NavBar title={i18next.t(LocaleKey.catalogue)} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="catalogue-container">
                        <h1>test</h1>
                    </div>
                </div>
            </div>
        </>
    );
}