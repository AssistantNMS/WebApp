
import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { genericItem } from '../../../constants/Route';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';
const ReactLazy = require('react-lazy-load-image-component');

interface IProps {
    items: Array<GameItemModel>
}

export const GameItemListWithoutScrollTracking = (props: IProps) => {

    return (
        <div id="game-item-list" className="game-item-list">
            {
                props.items.map((item) => {
                    return (
                        <LazyLoad key={`game-item-${item.Id}`} once offset={200} >
                            <div className="game-item">
                                <Link to={`${genericItem}/${item.Id}`} className="item">
                                    <div className="text-container">
                                        <p>{item.Name}</p>
                                    </div>
                                    <div className="image-container" style={{ backgroundColor: `#${item.Colour}` }}>
                                        <LazyLoadImage src={`/assets/images/${item.Icon}`} alt={item.Name} draggable={false} />
                                    </div>
                                </Link>
                            </div>
                        </LazyLoad>
                    )
                })
            }
        </div>
    );
}

export const GameItemList = ReactLazy.trackWindowScroll(GameItemListWithoutScrollTracking);
