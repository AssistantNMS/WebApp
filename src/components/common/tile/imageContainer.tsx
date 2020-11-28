
import * as React from 'react';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';
import { BadgeContainer } from './badgeContainer';

interface IProps {
    Icon: string;
    Directory?: string;
    Name: string;
    Description?: string;
    Colour?: string;
    BadgeColour?: string;
    OutputQuantity?: number;
}

export const ImageContainer = (props: IProps) => {
    let imageString = props.Directory ? `${props.Directory}${props.Icon}` : `/assets/images/${props.Icon}`
    let styleObj: any = {};
    if (props.Colour != null) {
        styleObj.backgroundColor = `#${props.Colour}`;
    }
    return (
        <div className="image-container" style={styleObj}>
            <LazyLoadImage src={imageString} alt={props.Description ?? props.Name} draggable={false} />
            {
                (props.OutputQuantity != null && props.OutputQuantity > 0)
                    ? <BadgeContainer Quantity={props.OutputQuantity} Colour={props.BadgeColour} />
                    : null
            }
        </div>
    );
};
