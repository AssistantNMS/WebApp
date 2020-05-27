import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { mapDispatchToProps, mapStateToProps } from './portal.Redux';
import { PortalListPresenter } from './portalListPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    portals: Array<PortalRecord>
    isDark: boolean;
    useAltGlyphs: boolean;
    removePortal: (portalId: string) => void;
}

export class PortalListContainerUnconnected extends React.Component<IProps, any> {
    render() {
        return (
            <PortalListPresenter
                {...this.props}
            />
        );
    }
};

export const PortalListContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(PortalListContainerUnconnected));