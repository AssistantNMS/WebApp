
import * as React from 'react';
import { Link } from 'react-router-dom';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { catalogueItem } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

export const GameItemListTile = (props: GameItemModel) => (
    <Link to={`${catalogueItem}/${props.Id}`} className="item" >
        <TextContainer text={props.Name} />
        <ImageContainer {...props} />
    </Link >
)
