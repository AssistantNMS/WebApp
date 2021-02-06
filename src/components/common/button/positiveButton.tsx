import classNames from 'classnames';
import React from 'react';

import './positiveButton.scss';

interface IProps {
    additionalClass?: string;
    children?: any;
    icon?: string;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
}

export const PositiveButton: React.FC<IProps> = (props: IProps) => {
    const buttonIconPadding = '2.2em';
    const styleObj: any = {
        paddingLeft: props.iconPosition === 'left' ? buttonIconPadding : undefined,
        paddingRight: props.iconPosition === 'right' ? buttonIconPadding : undefined
    };
    return (
        <>
            <div className={classNames('customButton noselect', props.additionalClass || '')}
                draggable={false}
                onClick={props.onClick}>
                {
                    props.iconPosition === 'left' &&
                    <i className="material-icons" style={{ left: '0.75em' }}>{props.icon}</i>
                }
                <div style={styleObj}>
                    {props.children}
                </div>
                {
                    props.iconPosition === 'right' &&
                    <i className="material-icons" style={{ right: '0.75em' }}>{props.icon}</i>
                }
            </div>
        </>
    );
}