import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { NetworkState } from '../../../constants/NetworkState';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';
import { anyObject } from '../../../helper/typescriptHacks';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ApiService } from '../../../services/ApiService';
import { GameItemService } from '../../../services/GameItemService';
import { WeekendMissionPresenter } from './weekendMissionPresenter';


interface IProps {
    location: any;
    match: any;
    history: any;

    // weekendMissionJson: LocaleKey;
    // season: string;
    // level: number;
    // maxLevel: number;
    // minLevel: number;
}

interface IState {
    title: string;
    gameItemService: GameItemService;
    weekendMissionStage: WeekendMissionStage;
    status: NetworkState;
}

export class WeekendMissionContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.weekendMission),
            gameItemService: new GameItemService(),
            weekendMissionStage: anyObject,
            status: NetworkState.Loading
        };
    }

    componentDidMount() {
        this.fetchWeekendMissionStage(
            this.props.location?.state?.weekendMissionJson,
            this.props.location?.state?.season,
            this.props.location?.state?.level,
        );
    }

    fetchWeekendMissionStage = async (weekendMissionJson: LocaleKey, season: string, levelId: number) => {
        var weekendMissionResult = await this.state.gameItemService.getWeekendMissionStage(weekendMissionJson, season, levelId);
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

export const WeekendMissionContainer = withRouter(WeekendMissionContainerUnconnected);