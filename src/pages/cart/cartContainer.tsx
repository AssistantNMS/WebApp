import React from 'react';
import { connect } from 'react-redux';
import { withServices } from '../../integration/dependencyInjection';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './cart.Redux';
import { CartPresenter } from './cartPresenter';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithoutDepInj, IReduxProps { }

export class CartContainerUnconnected extends React.Component<IProps, any> {
    render() {
        return (
            <CartPresenter {...this.props} />
        );
    }
};

export const CartContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CartContainerUnconnected),
    () => ({})
);
