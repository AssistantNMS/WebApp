
import * as React from 'react';
import { Link } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { catalogueItem } from '../../../constants/Route';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';

interface IProps {
    items: Array<GameItemModel>;
}

// interface IState {
//     displayItems: Array<GameItemModel>;
//     currentPage: number;
//     pageSize: number;
//     hasMoreItems: boolean;
// }

export const GameItemListWithoutScrollTracking = (props: IProps) => {

    return (
        <div id="game-item-list" className="game-item-list">
            {
                props.items.map((item: any) => {
                    return (
                        // <LazyLoad key={`game-item-${item.Id}`} once offset={200} >
                        <div key={`game-item-${item.Id}`} className="game-item">
                            <Link to={`${catalogueItem}/${item.Id}`} className="item">
                                <div className="text-container">
                                    <p>{item.Name}</p>
                                </div>
                                <div className="image-container" style={{ backgroundColor: `#${item.Colour}` }}>
                                    <LazyLoadImage src={`/assets/images/${item.Icon}`} alt={item.Name} draggable={false} />
                                </div>
                            </Link>
                        </div>
                        // </LazyLoad>
                    )
                })
            }
        </div>
    );
}

// export const GameItemList = ReactLazy.trackWindowScroll(GameItemListWithoutScrollTracking);
export const GameItemList = GameItemListWithoutScrollTracking;
