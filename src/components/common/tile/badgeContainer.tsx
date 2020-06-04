
import * as React from 'react';
import classNames from 'classnames';

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
        <div className={classNames('badge-container', { big: props.Quantity > 9 })} style={styleObj}>
            {props.Quantity}
        </div>
    );
};
