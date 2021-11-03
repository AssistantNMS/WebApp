import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { ExpeditionSeason } from '../../contracts/helloGames/expeditionSeason';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { getUseAltGlyphs } from '../../redux/modules/setting/selector';
import { State } from '../../redux/state';
import { ApiService } from '../../services/api/ApiService';
import { GameItemService } from '../../services/json/GameItemService';
import { ExpeditionSeasonHeader } from './expeditionSeasonComponents';

interface IWithDepInj {
    apiService: ApiService;
    gameItemService: GameItemService;
}
interface IFromRedux {
    useAltGlyphs: boolean;
}
interface IWithoutDepInj {

}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj {
}

const ExpeditionSeasonPhaseListUnconnected: React.FC<IProps> = (props: IProps) => {
    const [expedition, setExpedition] = useState<ExpeditionSeason>();
    const [expeditionStatus, setExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchExpeditionData('seas-1');
        // eslint-disable-next-line
    }, []);

    const fetchExpeditionData = async (seasId: string) => {
        const expeditionsResult = await props.gameItemService.getAllSeasonExpeditions();
        if (!expeditionsResult.isSuccess) {
            setExpedition(anyObject);
            setExpeditionStatus(NetworkState.Error);
            return;
        }

        let found = false;
        for (const exp of expeditionsResult.value) {
            if (exp.Id === seasId) {
                found = true;
                setExpedition(exp);
                setExpeditionStatus(NetworkState.Success);
                break;
            }
        }

        if (!found) {
            setExpedition(anyObject);
            setExpeditionStatus(NetworkState.Error);
        }
    }

    const title = i18next.t(LocaleKey.seasonalExpeditionSeasons);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1 pb5">
                    <ExpeditionSeasonHeader
                        networkState={expeditionStatus}
                        seasonDetails={expedition}
                        useAltGlyphs={props.useAltGlyphs}
                    />
                    <hr />
                </div>
            </div>
        </>
    );
}

export const mapStateToProps = (state: State) => {
    return {
        useAltGlyphs: getUseAltGlyphs(state),
    };
};

export const ExpeditionSeasonPhaseList = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(ExpeditionSeasonPhaseListUnconnected),
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        gameItemService: services.gameItemService,
    })
);