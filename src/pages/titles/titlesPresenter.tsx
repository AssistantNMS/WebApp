import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { SearchBar } from '../../components/common/searchBar';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NameFloatingActionButton } from '../../components/floatingActionButton/nameFloatingActionButton';
import { TitleItemListTile } from '../../components/tilePresenter/titleListTile/titleListTilePresenter';
import { NetworkState } from '../../constants/NetworkState';
import { TitleData } from '../../contracts/TitleData';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { IReduxProps } from './titles.Redux';

interface IProps extends IReduxProps {
    selectedLanguage?: string;
    networkState: NetworkState;

    // State
    titles: Array<TitleData>;
    searchTerm: string;

    // Container methods
    setPlayerName?: () => void;
    setSearch: (searchText: string) => void;
}

export const TitlesPresenter: React.FC<IProps> = (props: IProps) => {

    const getFloatingActionButtons = (): Array<any> => {
        const components: any[] = [];
        components.push(NameFloatingActionButton(() => props?.setPlayerName?.()));
        return components;
    }

    const handleLoadingOrError = () => {
        if (props.networkState === NetworkState.Loading) return <div className="pt-5"><SmallLoading /></div>;
        if (props.networkState === NetworkState.Error) {
            return (<h2>{translate(LocaleKey.error)}</h2>);
        }
        return displayDetails();
    }

    const displayDetails = () => {
        if (props.playerName == null || props.playerName.length < 1) props?.setPlayerName?.();
        const searchTiles = props.titles.filter(title => {
            if (title.Title?.toLowerCase?.().includes?.(props.searchTerm?.toLowerCase?.())) return true;
            if (title.Description?.toLowerCase?.().includes?.(props.searchTerm?.toLowerCase?.())) return true;

            return false;
        });
        return (
            <DefaultAnimation>
                <div className="content">
                    <SearchBar
                        searchTerm={props.searchTerm}
                        onSearchTextChange={(e: any) => props.setSearch(e?.target?.value ?? props.searchTerm)}
                    />
                    <GenericListPresenter
                        list={searchTiles}
                        presenter={(tile: TitleData) => (
                            <TitleItemListTile
                                {...tile}
                                playerName={props.playerName}
                                isOwned={props.ownedTitles?.includes?.(tile.Id) ?? false}
                                addToOwned={props.addToOwned}
                                removeFromOwned={props.removeFromOwned}
                            />
                        )}
                    />
                </div>
            </DefaultAnimation>
        )
    }

    const titlesTotals = '{0} - {1} / {2}'
        .replace('{0}', translate(LocaleKey.titles))
        .replace('{1}', props.ownedTitles?.length?.toString?.() ?? '0')
        .replace('{2}', props.titles?.length?.toString?.() ?? '0');

    return (
        <>
            <HeadComponent
                title={translate(LocaleKey.titles)}
                description={translate(LocaleKey.titles)}
                selectedLanguage={props.selectedLanguage}
            />
            <NavBar title={titlesTotals} additionalItems={getFloatingActionButtons()} />
            {handleLoadingOrError()}
            <div className="col-12" style={{ marginTop: '8em' }}></div>
        </>
    );
}
