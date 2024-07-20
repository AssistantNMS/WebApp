/* eslint-disable react/prop-types */
import React from 'react';
import { Tooltip } from 'react-tippy';

export const CustomTooltipInternal = (props) => {
    return (
        <Tooltip
            {...props}
        >
            {props.children}
        </Tooltip>
    );
}