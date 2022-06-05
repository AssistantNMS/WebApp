
import * as React from 'react';
import { translate } from '../../../localization/Translate';
import { Link } from 'react-router-dom';

import { LocaleKey } from '../../../localization/LocaleKey';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

export const RequiredItemDetailsListTile: (props: RequiredItemDetails, index: number) => JSX.Element = (props: RequiredItemDetails) => (
    <Link to={`${catalogueItem}/${props.Id}`} data-id="RequiredItemDetailsListTile" className="gen-item-container" draggable={false}>
        <ImageContainer {...props} />
        <div className="gen-item-content-container">
            <TextContainer text={props.Name} />
            <div className="quantity-container">{translate(LocaleKey.quantity)}: {props.Quantity}</div>
        </div>
    </Link>
);
