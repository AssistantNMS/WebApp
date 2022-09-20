import React from 'react';
import { CustomTooltip } from '../common/tooltip/tooltip';

interface IProps {
    keyString: string;
    icon: React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>;
    tooltipText?: string;
    onClick: (e: any) => void;
}

export const BaseFloatingActionButton = (props: IProps) => {
    const child = (
        <button
            className="mdc-fab fab-bg-color fab-margin"
            onClick={props.onClick}
        >
            {props.icon}
        </button>
    );

    if (props.tooltipText != null) {
        return (
            <CustomTooltip
                tooltipText={(props.tooltipText ?? props.icon) ?? 'tooltip'}
                position="bottom-start"
                theme="light"
            >
                {child}
            </CustomTooltip>
        );
    }
    return (child);
}