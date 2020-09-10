import i18next from 'i18next';
import React from 'react';

import { NetworkState } from '../../../constants/NetworkState';
import { PlatformType } from '../../../contracts/enum/PlatformType';
import { WeekendMissionViewModel } from '../../../contracts/generated/Model/HelloGames/weekendMissionViewModel';
import { anyObject } from '../../../helper/typescriptHacks';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ApiService } from '../../../services/ApiService';
import { WeekendMissionPresenter } from './weekendMissionPresenter';
import { GameItemService } from '../../../services/GameItemService';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';

interface IProps {
}

interface IState {
    title: string;
    apiService: ApiService;
    gameItemService: GameItemService;
    weekendMissionStage: WeekendMissionStage;
    status: NetworkState;
}

export class WeekendMissionContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.weekendMission),
            apiService: new ApiService(),
            gameItemService: new GameItemService(),
            weekendMissionStage: anyObject,
            status: NetworkState.Loading
        };
        this.fetchWeekendMission();
    }

    fetchWeekendMission = async () => {
        var weekendMissionResult = await this.state.apiService.getWeekendMission();
        if (!weekendMissionResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.fetchWeekendMissionStage(weekendMissionResult.value.seasonId, weekendMissionResult.value.level);
    }

    fetchWeekendMissionStage = async (seasonId: string, levelId: number) => {
        var weekendMissionResult = await this.state.gameItemService.getWeekendMissionStage(seasonId, levelId);
        if (!weekendMissionResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                weekendMissionStage: weekendMissionResult.value,
                status: NetworkState.Success
            }
        });
    }

    render() {
        return (
            <WeekendMissionPresenter
                {...this.state} {...this.props}
            />
        );
    }
}

