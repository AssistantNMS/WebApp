import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { RequiredItem } from '../../contracts/RequiredItem';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';


interface IProps {
    location: any;
    match: any;
    history: any;
}

export const GenericPageAllRequiredPresenter = withRouter((props: IProps) => {
    const title = i18next.t(LocaleKey.allRawMaterialsRequired);
    setDocumentTitle(title);

    const requiredItemIds: RequiredItem[] = props.location?.state?.requiredItems || []
    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="row">
                        <div className="col-12">
                            {
                                requiredItemIds.length > 1
                                    ? <GenericListPresenter list={requiredItemIds} presenter={RequiredItemListTile} />
                                    : <h2>{i18next.t(LocaleKey.noCartItems)}</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
