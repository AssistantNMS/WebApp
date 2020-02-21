
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

export const RequiredItemListTile = (props: any | RequiredItemDetails) => {

    return (
        <Link to={`${catalogueItem}/${props.Id}`} className="item">
            <TextContainer text={props.Name} />
            <ImageContainer {...props} />
            <div className="quantity-container">
                <h3>{props.Quantity}</h3>
            </div>
        </Link>
    );
}
