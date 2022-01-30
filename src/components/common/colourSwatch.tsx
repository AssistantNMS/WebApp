import React from 'react';

interface IProps {
    hex: string;
}

export const ColourSwatch: React.FC<IProps> = (props: IProps) => {
    let localHexValue = '';
    if (props.hex.length === 7 && props.hex.includes('#')) {
        localHexValue = props.hex;
    }

    if (props.hex.length === 6) {
        localHexValue = '#' + props.hex;
    }

    if (localHexValue.length < 1) return (<></>);

    return (
        <span className="colour-swatch" style={{ backgroundColor: localHexValue }}></span>
    );
}