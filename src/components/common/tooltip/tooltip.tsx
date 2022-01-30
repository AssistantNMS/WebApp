import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tippy';

export type Position =
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
export type Theme = "dark" | "light" | "transparent";

interface IProps {
    tooltipText?: string;
    children: ReactNode;
    position?: Position;
    theme?: Theme;
}

export const CustomTooltip: React.FC<IProps> = (props: IProps) => {
    return (
        <Tooltip
            title={props.tooltipText}
            arrow={true}
            theme={props.theme ?? "dark"}
            position={props.position ?? "top"}
            className="noselect"
        >
            {props.children}
        </Tooltip>
    );
}