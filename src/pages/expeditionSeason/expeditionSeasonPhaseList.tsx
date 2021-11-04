import i18next from 'i18next';
import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';

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
import { ExpeditionSeasonHeader, ExpeditionSeasonPhases } from './expeditionSeasonComponents';

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
    const history = useHistory();

    const [expedition, setExpedition] = useState<ExpeditionSeason>();
    const [expeditionStatus, setExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);
    const [isDetailPaneOpen, setDetailPaneOpen] = useState<boolean>(false);
    const [detailPane, setDetailPane] = useState<ReactNode>(<></>);
    const [snapPoint, setSnapPoint] = useState<number>(400);

    useEffect(() => {
        const url = history.location.pathname;
        const seasIdSlashIndex = url.lastIndexOf('/');
        const seasId = url.substring(seasIdSlashIndex + 1, url.length);
        fetchExpeditionData(seasId);
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

    const title = i18next.t(LocaleKey.seasonalExpedition);
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
                    <ExpeditionSeasonPhases
                        networkState={expeditionStatus}
                        phases={expedition?.Phases}
                        setDetailPane={(newNode: ReactNode, snapPoint: number = 400) => {
                            setDetailPane(newNode);
                            setDetailPaneOpen(true);
                            setSnapPoint(snapPoint);
                        }}
                    />
                </div>
            </div>
            <BottomModalSheet
                isOpen={isDetailPaneOpen}
                onClose={() => setDetailPaneOpen(false)}
                snapPoints={[snapPoint]}
            >
                <div className="container">
                    {detailPane}
                </div>
            </BottomModalSheet>
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