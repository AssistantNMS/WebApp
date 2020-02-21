
import * as React from 'react';
import { Link } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { catalogueItem } from '../../../constants/Route';

import { LazyLoadImage } from '../../core/lazyLoadImage/lazyLoadImage';

interface IProps {
    items: Array<GameItemModel>;
}

interface IState {
    displayItems: Array<GameItemModel>;
    currentPage: number;
    pageSize: number;
    hasMoreItems: boolean;
}

export class GameItemListWithoutScrollTracking extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        const pageSize = 50;

        this.state = {
            displayItems: this.props.items.slice(0, pageSize),
            currentPage: 0,
            pageSize: pageSize,
            hasMoreItems: true
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        this.loadItems(this.state.currentPage + 1);
    }

    loadItems = (requestedPage: number) => {
        const startIndex = requestedPage * this.state.pageSize;
        let endIndex = startIndex + this.state.pageSize;

        let hasReachedTheEnd = false;
        if (this.props.items.length < endIndex) {
            endIndex = this.props.items.length;
            hasReachedTheEnd = true;
        }

        const currentItems = this.state.displayItems;
        for (let newItemIndex = startIndex; newItemIndex < endIndex; newItemIndex++) {
            const newItem = this.props.items[newItemIndex];
            currentItems.push(newItem);
        }

        this.setState(() => {
            return {
                displayItems: currentItems,
                currentPage: requestedPage,
                hasMoreItems: !hasReachedTheEnd
            };
        });
    }

    render() {
        return (
            <div id="game-item-list" className="game-item-list">
                {
                    this.state.displayItems.map((item: any) => {
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
}

// export const GameItemList = ReactLazy.trackWindowScroll(GameItemListWithoutScrollTracking);
export const GameItemList = GameItemListWithoutScrollTracking;
