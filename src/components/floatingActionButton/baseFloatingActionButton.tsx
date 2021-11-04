import React from 'react';
import { Fab } from '@material/react-fab'

import { CustomTooltip } from '../common/tooltip/tooltip';

interface IProps {
    keyString: string;
    icon: React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>;
    tooltipText?: string;
    onClick: (e: any) => void;
}

export const BaseFloatingActionButton = (props: IProps) => {
    const child = (
        <Fab className="fab-bg-color fab-margin"
            key={props.keyString}
            icon={props.icon}
            onClick={props.onClick}
        />
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