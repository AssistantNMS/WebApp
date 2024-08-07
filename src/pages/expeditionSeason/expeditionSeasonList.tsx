import React, { useEffect, useState } from 'react';

import { translate } from '../../localization/Translate';
import { NetworkState } from '../../constants/NetworkState';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ExpeditionSeasonViewModel } from '../../contracts/generated/Model/HelloGames/expeditionSeasonViewModel';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameItemService } from '../../services/json/GameItemService';
import { CurrentExpeditionSeasonHeader } from './expeditionSeasonComponents';
import { ExpeditionSeasonTiles } from './expeditionSeasonTiles';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';

interface IWithDepInj {
  apiService: ApiService;
  gameItemService: GameItemService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const ExpeditionSeasonListUnconnected: React.FC<IProps> = (props: IProps) => {
  const [currentExpedition, setCurrentExpedition] = useState<ExpeditionSeasonViewModel>();
  const [currentExpeditionStatus, setCurrentExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    fetchCurrentExpedition();
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
  };

  const title = translate(LocaleKey.seasonalExpeditionSeasons);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1 pb5">
          <CurrentExpeditionSeasonHeader
            key={currentExpeditionStatus.toString()}
            networkState={currentExpeditionStatus}
            seasonDetails={currentExpedition}
          />
          <ExpeditionSeasonTiles gameItemService={props.gameItemService} />
        </div>
      </div>
    </DefaultAnimation>
  );
};

export const ExpeditionSeasonList = withServices<IWithoutDepInj, IWithDepInj>(ExpeditionSeasonListUnconnected, (services: IDependencyInjection) => ({
  apiService: services.apiService,
  gameItemService: services.gameItemService,
}));
