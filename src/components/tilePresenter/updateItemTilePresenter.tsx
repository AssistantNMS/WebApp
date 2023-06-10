
import * as React from 'react';


import { UpdateItem } from '../../contracts/data/updateItem';
import { ImageContainer } from '../common/tile/imageContainer';
import { TextContainer } from '../common/tile/textContainer';
import { Link } from 'react-router-dom';
import { newItemsAddedDetails, newItemsAddedParam } from '../../constants/Route';

interface IProps extends UpdateItem {
}

export const UpdateItemCardListTile: React.FC<IProps> = (props: IProps) => {

    return (
        <Link
            to={`${newItemsAddedDetails.replaceAll(newItemsAddedParam, props.guid)}`}
            className="update item card"
            draggable={false}
        >
            <ImageContainer Icon={props.icon} Name={props.title} Colour="" />
            <TextContainer text={props.title} additionalCss="title" />
            <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>

            </div>
        </Link>
    );
}
