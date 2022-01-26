import React from 'react';
import classNames from 'classnames';
import { DevDetail } from '../../../contracts/data/devDetail';
import { GenericListPresenter } from '../genericListPresenter/genericListPresenter';
import { shouldListBeCentered } from '../../../helper/mathHelper';
import { GameItemFromDevDetailsListTile } from '../../../components/tilePresenter/gameItemListTile/gameItemFromDevDetailsListTile';

interface IProps {
    searchText?: string;
    selectedSearchResult: number;
    searchResults: Array<DevDetail>;
    setSelectedSearchResult: (newIndex: number) => void;
    openItem: (devItem: DevDetail) => (e: any) => void;
}

export const SpotlightSearchResult: React.FC<IProps> = (props: IProps) => {

    return (
        <div key="spotlight" className={classNames('spotlight-results-bg mt-1em', { isOpen: props.searchResults.length > 0 })}>
            <GenericListPresenter
                list={props.searchResults}
                presenter={(devd: DevDetail, index: number) => (
                    <GameItemFromDevDetailsListTile
                        key={devd.Id}
                        Id={devd.Id}
                        Properties={devd.Properties}
                        searchText={props.searchText}
                    />
                )}
                identifier={(devd: DevDetail) => devd.Id}
                isCentered={shouldListBeCentered(props.searchResults.length)}
                hideViewMoreButton={true}
                limitResultsTo={45}
            />
        </div>
    );
}