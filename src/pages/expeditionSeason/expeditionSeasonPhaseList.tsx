import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { seasonExpedition } from '../../constants/Route';
import { ExpeditionSeason } from '../../contracts/helloGames/expeditionSeason';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { getCurrentLanguage, getUseAltGlyphs } from '../../redux/modules/setting/selector';
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
  selectedLanguage: string;
}
interface IWithoutDepInj {}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj {}

const ExpeditionSeasonPhaseListUnconnected: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();

  const [expedition, setExpedition] = useState<ExpeditionSeason>();
  const [expeditionStatus, setExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);
  const [isDetailPaneOpen, setDetailPaneOpen] = useState<boolean>(false);
  const [detailPane, setDetailPane] = useState<ReactNode>(<></>);
  const [expBadge, setExpBadge] = useState<ReactNode>(<></>);
  const [snapPoint, setSnapPoint] = useState<number>(400);

  useEffect(() => {
    if (!location.pathname.includes(seasonExpedition)) return;

    const url = location.pathname;
    const seasIdSlashIndex = url.lastIndexOf('/');
    const seasId = url.substring(seasIdSlashIndex + 1, url.length);
    fetchExpeditionData(seasId);
  }, [props.selectedLanguage]);

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
  };

  const openDetailPaneFunc = (newNode: ReactNode, expPatch: ReactNode, snapPoint: number = 400) => {
    setExpBadge(expPatch);
    setDetailPane(newNode);
    setDetailPaneOpen(true);
    setSnapPoint(snapPoint);
  };

  const infoNotComplete = (expedition?.Rewards?.length ?? 0) < 1;
  const title = translate(LocaleKey.seasonalExpedition);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        {infoNotComplete && expeditionStatus === NetworkState.Success && (
          <div className="alert alert-full alert-error row noselect">
            <i className="material-icons">error</i>&nbsp;&nbsp;
            <span style={{ paddingTop: '0.15em' }}>This data is incomplete and we are working on getting accurate information!</span>
            &nbsp;&nbsp;<i className="material-icons">error</i>
          </div>
        )}
        <div className="container full pt1 pb5">
          <ExpeditionSeasonHeader
            networkState={expeditionStatus}
            seasonDetails={expedition}
            useAltGlyphs={props.useAltGlyphs}
            setDetailPane={openDetailPaneFunc}
          />
          <hr />
          <ExpeditionSeasonPhases networkState={expeditionStatus} phases={expedition?.Phases} setDetailPane={openDetailPaneFunc} />
        </div>
      </div>
      <BottomModalSheet
        isOpen={isDetailPaneOpen}
        onClose={() => setDetailPaneOpen(false)}
        snapPoints={[snapPoint]}
        className="expedition-bottom-modal-sheet"
      >
        <div className="container expedition-bottom-modal-sheet-content noselect">
          {detailPane}
          {expBadge != null && expBadge}
        </div>
      </BottomModalSheet>
    </DefaultAnimation>
  );
};

export const mapStateToProps = (state: State) => {
  return {
    useAltGlyphs: getUseAltGlyphs(state),
    selectedLanguage: getCurrentLanguage(state),
  };
};

export const ExpeditionSeasonPhaseList = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps)(ExpeditionSeasonPhaseListUnconnected),
  (services: IDependencyInjection) => ({
    apiService: services.apiService,
    gameItemService: services.gameItemService,
  }),
);
