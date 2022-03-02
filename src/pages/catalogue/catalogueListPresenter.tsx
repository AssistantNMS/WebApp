import i18next from 'i18next';
import React, { useState } from 'react';
import { GameItemList } from '../../components/common/gameItemList/gameItemList';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameIdSearchFloatingActionButton } from '../../components/floatingActionButton/gameIdSearchFloatingActionButton';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { LocaleKey } from '../../localization/LocaleKey';
import { SpotlightSearch } from '../../components/common/spotlight/spotlightSearch';
import { DataJsonService } from '../../services/json/DataJsonService';
import { Error } from '../../components/core/error/error';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';

interface IProps {
    // Container Props
    selectedLanguage?: string;

    // Container State
    items: Array<GameItemModel>;
    displayItems: Array<GameItemModel>;
    searchTerm: string;
    networkState: NetworkState;
    dataJsonService: DataJsonService;

    // Container Specific
    onSearchTextChange: (e: any) => void;
    search: (e: any, searchText: string) => void;
}

export const CatalogueListPresenter: React.FC<IProps> = (props: IProps) => {
    const [isSpotlightOpen, setSpotlightOpen] = useState<boolean>(false);

    const getNavActionButtons = (): Array<any> => {
        const components: any[] = [];
        components.push(<GameIdSearchFloatingActionButton key="gameIdSearch" onClick={() => setSpotlightOpen(true)} />);
        return components;
    }

    const renderContent = () => {
        if (props.networkState === NetworkState.Loading) return (<SmallLoading />);
        if (props.networkState === NetworkState.Error) return (<Error />);

        return (
            <GameItemList key={props.displayItems.length} items={props.displayItems} />
        );
    }

    const title = i18next.t(LocaleKey.catalogue);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} additionalItems={getNavActionButtons()} />
            <div className="content" data-id="CatalogueListPresenter">
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
                {renderContent()}
            </div>
            <SpotlightSearch
                isOpen={isSpotlightOpen}
                onClose={() => setSpotlightOpen(false)}
                dataJsonService={props.dataJsonService}
            />
        </DefaultAnimation>
    );
}