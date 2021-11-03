import i18next from 'i18next';
import React, { useEffect, useState } from 'react';

import { NetworkState } from '../../constants/NetworkState';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameItemService } from '../../services/json/GameItemService';
import { CurrentExpeditionSeasonHeader, SeasonExpeditionCards } from './expeditionSeasonComponents';

interface IWithDepInj {
    apiService: ApiService;
    gameItemService: GameItemService;
}
interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
}

const ExpeditionSeasonListUnconnected: React.FC<IProps> = (props: IProps) => {
    const [currentExpedition, setCurrentExpedition] = useState<ExpeditionSeasonViewModel>();
    const [currentExpeditionStatus, setCurrentExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchCurrentExpedition();
        // eslint-disable-next-line
    }, []);

    const fetchCurrentExpedition = async () => {
        const expeditionResult = await props.apiService.getCurrentExpedition();
        if (!expeditionResult.isSuccess) {
            setCurrentExpedition(anyObject);
            setCurrentExpeditionStatus(NetworkState.Error);
            return;
        }
        setCurrentExpedition(expeditionResult.value);
        setCurrentExpeditionStatus(NetworkState.Success);
    }

    const title = i18next.t(LocaleKey.seasonalExpeditionSeasons);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <CurrentExpeditionSeasonHeader
                        key={currentExpeditionStatus.toString()}
                        networkState={currentExpeditionStatus}
                        seasonDetails={currentExpedition}
                    />
                    <hr />
                    <SeasonExpeditionCards />
                </div>
            </div>
        </>
    );
}


export const ExpeditionSeasonList = withServices<IWithoutDepInj, IWithDepInj>(
    ExpeditionSeasonListUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        gameItemService: services.gameItemService,
    })
);