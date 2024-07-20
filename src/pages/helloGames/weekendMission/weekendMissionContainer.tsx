import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { NetworkState } from '../../../constants/NetworkState';
import { IWeekendMissionMeta, WeekendMissions } from '../../../constants/WeekendMission';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { WeekendMissionPresenter } from './weekendMissionPresenter';
import { IFromRedux, mapStateToProps } from './weekendMission.redux';
import * as Routes from '../../../constants/Route';

interface IWithDepInj {
  gameItemService: GameItemService;
}

interface IWithoutDepInj {}
interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj {}

export const WeekendMissionContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();

  const [weekendMission, setWeekendMission] = useState<WeekendMissionStage>();
  const [weekendMissionMeta, setWeekendMissionMeta] = useState<IWeekendMissionMeta>();
  const [weekendMissionStatus, setWeekendMissionStatus] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    if (!location.pathname.includes(Routes.weekendMission)) return;
    fetchWeekendMissionStage();
  }, [props.selectedLanguage, location.pathname]);

  const fetchWeekendMissionStage = async (newLevel?: number) => {
    const url = location.pathname;
    const seasIdSlashIndex = url.lastIndexOf('/');
    const seasId = url.substring(seasIdSlashIndex + 1, url.length);

    let wmSeasonObj;
    for (const seasObj of WeekendMissions) {
      if (seasObj.id !== seasId) continue;
      wmSeasonObj = seasObj;
    }
    if (wmSeasonObj == null) return;

    if (newLevel != null && newLevel !== 0) {
      wmSeasonObj.level = newLevel;
    }

    const weekendMissionResult = await props.gameItemService.getWeekendMissionStage(
      wmSeasonObj.weekendMissionJson,
      wmSeasonObj.season,
      wmSeasonObj.level,
    );
    if (!weekendMissionResult.isSuccess) {
      setWeekendMissionStatus(NetworkState.Error);
      return;
    }

    setWeekendMissionMeta({
      level: wmSeasonObj.level,
      maxLevel: wmSeasonObj.maxLevel,
      minLevel: wmSeasonObj.minLevel,
    });
    setWeekendMission(weekendMissionResult.value);
    setWeekendMissionStatus(NetworkState.Success);
  };

  const navigateToWeekendMissionLevel = (newLevel: number) => {
    setWeekendMissionStatus(NetworkState.Loading);
    fetchWeekendMissionStage(newLevel);
  };

  return (
    <WeekendMissionPresenter
      key={`weekend-missin-presenter-${props.selectedLanguage}`}
      {...props}
      weekendMissionStage={weekendMission!}
      status={weekendMissionStatus}
      level={weekendMissionMeta?.level}
      maxLevel={weekendMissionMeta?.maxLevel}
      minLevel={weekendMissionMeta?.minLevel}
      navigateToWeekendMissionLevel={navigateToWeekendMissionLevel}
    />
  );
};

export const WeekendMissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps)(WeekendMissionContainerUnconnected),
  (services: IDependencyInjection) => ({
    gameItemService: services.gameItemService,
  }),
);
