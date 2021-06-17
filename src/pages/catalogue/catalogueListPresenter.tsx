import i18next from 'i18next';
import React from 'react';
import { GameItemList } from '../../components/common/gameItemList/gameItemList';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { LocaleKey } from '../../localization/LocaleKey';
import './catalogue.scss';

interface IProps {
    // Container Props
    selectedLanguage?: string;

    // Container State
    items: Array<GameItemModel>;
    displayItems: Array<GameItemModel>;
    searchTerm: string;
    networkState: NetworkState;

    // Container Specific
    onSearchTextChange: (e: any) => void;
    search: (e: any, searchText: string) => void;
}

export const CatalogueListPresenter: React.FC<IProps> = (props: IProps) => {

    const title = i18next.t(LocaleKey.catalogue);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <form id="searchBar" className="searchbar row noselect" onSubmit={(e) => props.search(e, props.searchTerm)}>
                    <input type="text"
                        className="form-control"
                        placeholder={i18next.t(LocaleKey.search)}
                        value={props.searchTerm}
                        onChange={props.onSearchTextChange}
                    />
                    <button className="icon-container pointer" type="submit">
                        <i className="material-icons">search</i>
                    </button>
                </form>
                {
                    props.networkState === NetworkState.Loading
                        ? <SmallLoading />
                        : <GameItemList key={props.displayItems.length} items={props.displayItems} />
                }
            </div>
        </>
    );
}