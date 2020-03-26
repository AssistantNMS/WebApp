import React from 'react';

export const UpdateButton: React.FC<any> = (props: any) => {
    return (
        <span className="pointer" onClick={props.onClick}>Update available</span>
    );
}