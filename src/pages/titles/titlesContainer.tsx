import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NetworkState } from '../../constants/NetworkState';
import { TitleData } from '../../contracts/TitleData';
import { getStringDialog } from '../../helper/dialogHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { GameItemService } from '../../services/json/GameItemService';
import { mapStateToProps, IReduxProps, mapDispatchToProps } from './titles.Redux';
import { TitlesPresenter } from './titlesPresenter';

interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

const TitlesContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [titles, setTitles] = useState<Array<TitleData>>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const titlesResult = await props.gameItemService.getTitles();
        if (!titlesResult.isSuccess) {
            setNetworkState(NetworkState.Error);
            return;
        }
        setTitles(titlesResult.value);
        setNetworkState(NetworkState.Success);
    }

    const setPlayerName = async () => {
        const playerName = await getStringDialog(i18next.t(LocaleKey.playerName), props.playerName ?? '');
        if (props.setPlayerName == null) return;
        props.setPlayerName(playerName);
    }

    return (
        <TitlesPresenter
            {...props}
            titles={titles}
            searchTerm={search}
            networkState={networkState}
            playerName={props.playerName}
            selectedLanguage={props.selectedLanguage}
            setPlayerName={setPlayerName}
            setSearch={(searchText: string) => setSearch(searchText)}
        />
    );
}

export const TitlesContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(TitlesContainerUnconnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);
