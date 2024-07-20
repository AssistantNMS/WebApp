import React from 'react';
import { connect } from 'react-redux';
import { withServices } from '../../integration/dependencyInjection';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './portal.Redux';
import { PortalListPresenter } from './portalListPresenter';

interface IWithDepInj {}
interface IWithoutDepInj {}
interface IProps extends IWithoutDepInj, IReduxProps {}

export const PortalListContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  return <PortalListPresenter {...props} />;
};

export const PortalListContainer = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(PortalListContainerUnconnected),
  () => ({}),
);
