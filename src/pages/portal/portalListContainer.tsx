import React from 'react';
import { connect } from 'react-redux';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './portal.Redux';
import { PortalListPresenter } from './portalListPresenter';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithoutDepInj, IReduxProps { }

export class PortalListContainerUnconnected extends React.Component<IProps, any> {
    render() {
        return (
            <PortalListPresenter
                {...this.props}
            />
        );
    }
};

export const PortalListContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(PortalListContainerUnconnected),
    (services: IDependencyInjection) => ({})
);
