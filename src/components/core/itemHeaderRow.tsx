import React from 'react';
import { LazyLoadImage } from './lazyLoadImage/lazyLoadImage';

interface IProps {
    Colour?: string;
    Icon?: string;
    Name?: string;
    Group?: string;
    Description?: string;
}

export const ItemHeaderRow: React.FC<IProps> = (props: IProps) => {
    const name = props?.Name ?? '...';
    const group = props?.Group ?? '...';
    return (
        <div className="row border-bottom">
            <div className="col-12 col-lg-2 col-md-2 col-sm-2 col-xs-3 image-container generic-item-image-container"
                style={{ backgroundColor: `#${props.Colour}` }}>
                {
                    (props?.Icon != null)
                        ? <LazyLoadImage src={`/assets/images/${props?.Icon ?? ''}`} alt={name} style={{ maxWidth: '100%' }} />
                        : null
                }
            </div>
            <div className="col-12 col-lg-10 col-md-10 col-sm-10 col-xs-9">
                <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{name}</h2>
                <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{group}</h3>
                {
                    props?.Description
                        ? <h5 className="ta-left ta-center-sm">{props.Description}</h5>
                        : null
                }
            </div>
        </div>
    );
}

