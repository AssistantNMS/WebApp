import classNames from 'classnames';
import React from 'react';

import './positiveButton.scss';

interface IProps {
    additionalClass?: string;
    children?: any;
    onClick?: () => void;
}

export const PositiveButton: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <div className={classNames('customButton', props.additionalClass || '')}
                onClick={props.onClick}>
                {props.children}
            </div>
        </>
    );
}