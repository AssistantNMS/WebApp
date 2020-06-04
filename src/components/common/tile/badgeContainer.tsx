
import * as React from 'react';

interface IProps {
    Quantity: number;
    Colour?: string;
}

export const BadgeContainer = (props: IProps) => {
    let styleObj: any = {};
    if (props.Colour != null) {
        styleObj.backgroundColor = `#${props.Colour}`;
    }
    return (
        <div className="badge-container" style={styleObj}>
            {props.Quantity}
        </div>
    );
};
