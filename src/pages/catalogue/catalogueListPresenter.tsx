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
import { SearchBar } from '../../components/common/searchBar';

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
                <SearchBar
                    searchTerm={props.searchTerm}
                    onSearchTextChange={props.onSearchTextChange}
                />
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