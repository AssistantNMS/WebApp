
import classNames from 'classnames';
import * as React from 'react';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';
import { BadgeContainer } from './badgeContainer';

interface IProps {
    Icon: string;
    Directory?: string;
    Name: string;
    greyScale?: boolean;
    Description?: string;
    Colour?: string;
    BadgeColour?: string;
    OutputQuantity?: number;
}

export const ImageContainer = (props: IProps) => {
    let imageString = props.Directory ? `${props.Directory}${props.Icon}` : `/assets/images/${props.Icon}`
    let styleObj: any = {};
    if (props.Colour != null) {
        styleObj.backgroundColor = props.greyScale === true ? 'grey' : `#${props.Colour}`;
    }
    return (
        <div className="image-container" style={styleObj}>
            {/* <img
                src={imageString}
                alt={props.Name ?? props.Icon}
                draggable={false}
            /> */}
            <LazyLoadImage
                src={imageString}
                className={classNames({ grayscale: props.greyScale === true })}
                alt={props.Name ?? props.Icon}
                draggable={false}
            />
            {
                (props.OutputQuantity != null && props.OutputQuantity > 0)
                    ? <BadgeContainer Quantity={props.OutputQuantity} Colour={props.BadgeColour} />
                    : null
            }
        </div>
    );
};
