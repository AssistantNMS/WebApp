
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Guide } from '../../../contracts/guide/guide';
import { guides } from '../../../constants/Route';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';

export const GuideCardListTile = (props: Guide) => {
    const displayTags = () => {
        if (!props.tags || props.tags.length < 1) return null;

        const tagsToDisplay = props.tags;
        // const tagsToDisplay = props.tags.length > 4
        //     ? [...props.tags.slice(0, 4), '...']
        //     : props.tags;

        return (
            <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                {
                    tagsToDisplay.map((item, index) => {
                        return <span key={`guideItem: ${index}`} className="default chip">{item}</span>
                    })
                }
            </div>
        );
    }
    return (
        <Link to={`${guides}/${props.guid}`} className="guide item card">
            <ImageContainer Icon={props.image} Name={props.shortTitle} Directory="/" Colour="" />
            <div className="row" style={{ "paddingTop": ".5em" }}>
                <div className="col-6">
                    <span>
                        <i className="material-icons">person</i>
                        {props.author}
                    </span>
                </div>
                <div className="col-6">
                    <span>
                        <i className="material-icons">timer</i>
                        {props.minutes}
                    </span>
                </div>
            </div>
            <TextContainer text={props.title} additionalCss="title" />
            {displayTags()}
        </Link>
    );
}
