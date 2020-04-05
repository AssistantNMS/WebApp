
import * as React from 'react';

import './genericListPresenter.scss';

interface IProps<T> {
    list: Array<T>;
    identifier?: (props: T) => string;
    presenter: (props: T, index: number) => JSX.Element;
}

export function GenericListPresenter<T>(props: IProps<T>) {
    return (
        <div className="generic-item-list row">
            {
                props.list.map((item: T, index: number) => {
                    const key = props.identifier ? props.identifier(item) : '';
                    return (
                        <div key={`generic-item-list ${index} ${key}`} className="gen-item col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {props.presenter(item, index)}
                        </div>
                    )
                })
            }
        </div>
    );
}

