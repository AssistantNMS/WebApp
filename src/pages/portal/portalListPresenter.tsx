import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AddFloatingActionButton } from '../../components/floatingActionButton/addFloatingActionButton';
import { PortalCardListTile } from '../../components/tilePresenter/portalItemListTile/portalItemListTile';
import * as Route from '../../constants/Route';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './portal.Redux';

interface IProps {
    location: any;
    match: any;
    history: any;
    portals: Array<PortalRecord>
    isDark: boolean;
    useAltGlyphs: boolean;
    removePortal: (portalId: string) => void;
}

export const PortalListPresenterUnconnected: React.FC<IProps> = (props: IProps) => {

    const displayPortals = (portals: Array<PortalRecord>) => {
        if (portals == null || portals.length === 0) return (
            <div className="col-12">
                <h2>{i18next.t(LocaleKey.noItems)}</h2>
            </div>
        );
        return portals.map((item: PortalRecord, index: number) => {
            return (
                <div key={`portal-${item.Uuid}-${index}`} className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                    <PortalCardListTile {...item}
                        isDark={props.isDark}
                        useAltGlyphs={props.useAltGlyphs}
                        onDelete={() => props.removePortal(item.Uuid)}
                        onEdit={() => props.history.push({
                            pathname: Route.addEditPortal,
                            state: item
                        })}
                    />
                </div>
            );
        });
    }

    const title = i18next.t(LocaleKey.portalLibrary);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1">
                    {displayPortals(props.portals)}
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
};

export const PortalListPresenter = connect(mapStateToProps, mapDispatchToProps)(PortalListPresenterUnconnected);