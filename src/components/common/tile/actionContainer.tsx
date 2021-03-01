
import classNames from 'classnames';
import * as React from 'react';

interface IProps {
    actions: Array<any>;
    additionalClass?: string;
}

export const ActionContainer = (props: IProps) => (
    <div className="action-container">
        <div className={classNames('action-list', props.additionalClass)}>
            <ul>
                {props.actions}
            </ul>
        </div>
    </div>
);
