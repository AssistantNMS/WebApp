
import * as React from 'react';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';
import { BadgeContainer } from './badgeContainer';

interface IProps {
    Icon: string;
    Directory?: string;
    Name: string;
    Colour?: string;
    Quantity?: number;
    BadgeColour?: string;
}

export const ImageContainer = (props: IProps) => {
    let imageString = props.Directory ? `${props.Directory}${props.Icon}` : `/assets/images/${props.Icon}`
    let styleObj: any = {};
    if (props.Colour != null) {
        styleObj.backgroundColor = `#${props.Colour}`;
    }
    return (
        <div className="image-container" style={styleObj}>
            <LazyLoadImage src={imageString} alt={props.Name} draggable={false} />
            {
                (props.Quantity != null && props.Quantity > 0)
                    ? <BadgeContainer Quantity={props.Quantity} Colour={props.BadgeColour} />
                    : null
            }
        </div>
    );
};
