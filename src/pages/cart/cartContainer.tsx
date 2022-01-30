import React from 'react';
import { connect } from 'react-redux';
import { withServices } from '../../integration/dependencyInjection';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './cart.Redux';
import { CartPresenter } from './cartPresenter';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

export const CartContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    return (
        <CartPresenter {...props} />
    );
};

export const CartContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CartContainerUnconnected),
    () => ({})
);
