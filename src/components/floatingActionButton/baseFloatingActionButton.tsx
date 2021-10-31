import React from 'react';

import { Fab } from '@material/react-fab'

interface IProps {
    key: string;
    icon: React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>;
    onClick: (e: any) => void;
}

export const BaseFloatingActionButton = (props: IProps) => {
    return (
        <Fab className="fab-bg-color fab-margin"
            key={props.key}
            icon={props.icon}
            onClick={props.onClick}
        />
    );
}