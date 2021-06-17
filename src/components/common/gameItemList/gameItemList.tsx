
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

export const GameItemListWithoutScrollTracking = (props: IProps) => {

    const displayGameItems = (any: any) => {
        const item: GameItemModel = any;
        return (<GameItemListTile {...item} />);
    }

    return (
        <div id="game-item-list" className="game-item-list noselect">
            <ReactList
                itemRenderer={(index: number) => {
                    const item = props.items[index];
                    return (
                        <div key={`game-item-${item.Id}`} className="game-item">
                            {
                                props.presenter != null
                                    ? props.presenter(item)
                                    : displayGameItems(item)
                            }
                        </div>
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
