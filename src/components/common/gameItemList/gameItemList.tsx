
import * as React from 'react';
import ReactList from 'react-list';

import { GameItemModel } from '../../../contracts/GameItemModel';
import { GameItemListTile } from '../../tilePresenter/gameItemListTile/gameItemListTile';
import { RequiredItemDetails } from '../../../contracts/RequiredItemDetails';
import { Processor } from '../../../contracts/Processor';

interface IProps {
    items: Array<GameItemModel | RequiredItemDetails | Processor>;
    presenter?: (props: GameItemModel | RequiredItemDetails | Processor) => JSX.Element
}

// interface IState {
//     displayItems: Array<GameItemModel>;
//     currentPage: number;
//     pageSize: number;
//     hasMoreItems: boolean;
// }

export const GameItemListWithoutScrollTracking = (props: IProps) => {

    const displayGameItems = (any: any) => {
        const item: GameItemModel = any;
        return (<GameItemListTile {...item} />);
    }

    return (
        <div id="game-item-list" className="game-item-list">
            <ReactList
                itemRenderer={(index: number) => {
                    const item = props.items[index];
                    return (
                        // <LazyLoad key={`game-item-${item.Id}`} once offset={200} >
                        <div key={`game-item-${item.Id}`} className="game-item">
                            {
                                props.presenter != null
                                    ? props.presenter(item)
                                    : displayGameItems(item)
                            }
                        </div>
                        // </LazyLoad>
                    )
                }}
                length={props.items.length}
                type='uniform'
            />
        </div>
    );
}

// export const GameItemList = ReactLazy.trackWindowScroll(GameItemListWithoutScrollTracking);
export const GameItemList = GameItemListWithoutScrollTracking;
