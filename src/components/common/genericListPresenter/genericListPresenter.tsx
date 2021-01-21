
import * as React from 'react';
import classNames from 'classnames';

import './genericListPresenter.scss';

interface IProps<T> {
    isCentered?: boolean;
    list: Array<T>;
    bootstrapClasses?: string;
    identifier?: (props: T) => string;
    presenter: (props: T, index: number) => JSX.Element;
}

export function GenericListPresenter<T>(props: IProps<T>) {
    let bootstrapClasses = props.bootstrapClasses || 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12';
    return (
        <div className={classNames('generic-item-list row', { justify: props.isCentered })}>
            {
                props.list.map((item: T, index: number) => {
                    const key = props.identifier ? props.identifier(item) : '';
                    return (
                        <div key={`generic-item-list ${index} ${key}`} className={classNames('gen-item', bootstrapClasses)}>
                            {props.presenter(item, index)}
                        </div>
                    )
                })
            }
        </div>
    );
}

