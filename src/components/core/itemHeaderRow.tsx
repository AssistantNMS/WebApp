import React from 'react';
import { LazyLoadImage } from './lazyLoadImage/lazyLoadImage';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';

interface IProps {
    Colour?: string;
    Icon?: string;
    Name?: string;
    Group?: string;
    Description?: string;
    Link?: any;
}

export const ItemHeaderRow: React.FC<IProps> = (props: IProps) => {
    const name = props?.Name ?? '...';
    const group = props?.Group ?? '...';
    return (
        <div className="row border-bottom">
            <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container"
                style={{ backgroundColor: `#${props.Colour}` }}>
                {
                    (props?.Icon != null)
                        ? <LazyLoadImage src={`/assets/images/${props?.Icon ?? ''}`} alt={name} style={{ maxWidth: '100%' }} />
                        : null
                }
            </div>
            <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9">
                <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{name}</h2>
                <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{group}</h3>
                {
                    props?.Description
                        ? <h5 className="ta-left ta-center-sm">{props.Description}</h5>
                        : null
                }
                {
                    props?.Link
                        ? <div style={{ marginBottom: '.25em', textAlign: 'left' }}>
                            <AdditionalInfoChip text={name} onClick={props.Link}>
                                <i className="material-icons" style={{ verticalAlign: 'middle' }}>read_more</i>
                            </AdditionalInfoChip>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

