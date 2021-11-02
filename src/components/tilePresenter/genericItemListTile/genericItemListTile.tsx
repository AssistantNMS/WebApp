
import * as React from 'react';
import { Link } from 'react-router-dom';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

export const GenericItemListTile: React.FC<GameItemModel> = (props: GameItemModel) => (
    <Link to={`${catalogueItem}/${props.Id}`} data-id="GenericItemListTile" className="gen-item-container" draggable={false}>
        <ImageContainer {...props} />
        <div className="gen-item-content-container">
            <TextContainer text={props.Name} additionalCss="full" />
        </div>
    </Link>
)
