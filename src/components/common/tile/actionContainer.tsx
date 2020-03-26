
import * as React from 'react';

interface IProps {
    actions: Array<any>
}

export const ActionContainer = (props: IProps) => (
    <div className="action-container">
        <div className="action-list">
            <ul>
                {props.actions}
            </ul>
        </div>
    </div>
);
