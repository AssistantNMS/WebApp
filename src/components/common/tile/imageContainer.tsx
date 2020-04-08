
import * as React from 'react';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';

interface IProps {
    Icon: string;
    Directory?: string;
    Name: string;
    Colour: string;
}

export const ImageContainer = (props: IProps) => {
    let imageString = props.Directory ? `${props.Directory}${props.Icon}` : `/assets/images/${props.Icon}`
    console.log(imageString);
    return (<div className="image-container" style={{ backgroundColor: `#${props.Colour}` }}>
        <LazyLoadImage src={imageString} alt={props.Name} draggable={false} />

    </div>);
};
