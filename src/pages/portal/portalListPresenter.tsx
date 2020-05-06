import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavBar } from '../../components/core/navbar/navbar';
import { AddFloatingActionButton } from '../../components/floatingActionButton/addFloatingActionButton';
import * as Route from '../../constants/Route';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './portal.Redux';

interface IProps {
    location: any;
    match: any;
    history: any;
    portals: Array<PortalRecord>
}

export const PortalListPresenterUnconnected = withRouter((props: IProps) => {
    const title = i18next.t(LocaleKey.portalLibrary);
    setDocumentTitle(title);

    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1">
                    {
                        (props.portals != null && props.portals.length > 0)
                            ? props.portals.map((item: PortalRecord, index: number) => {
                                return (
                                    <div key={`portal-${item.Uuid}-${index}`} className="col-12">
                                        <h1>{item.Name}</h1>
                                    </div>
                                );
                            })
                            : null
                    }
                </div>
            </div>
            {AddFloatingActionButton('portal-add', () => {
                props.history.push({
                    pathname: Route.addEditPortal,
                });
            })}
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </>
    );
});

export const PortalListPresenter = connect(mapStateToProps, mapDispatchToProps)(PortalListPresenterUnconnected);