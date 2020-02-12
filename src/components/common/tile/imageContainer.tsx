
import * as React from 'react';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';

interface IProps {
    Icon: string;
    Name: string;
    Colour: string;
}

export const ImageContainer = (props: IProps) => (
    <div className="image-container" style={{ backgroundColor: `#${props.Colour}` }}>
        <LazyLoadImage src={`/assets/images/${props.Icon}`} alt={props.Name} draggable={false} />
    </div>
);
