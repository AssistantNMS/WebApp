import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { NetworkState } from '../../../constants/NetworkState';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';
import { anyObject } from '../../../helper/typescriptHacks';
import { LocaleKey } from '../../../localization/LocaleKey';
import { GameItemService } from '../../../services/GameItemService';
import { WeekendMissionPresenter } from './weekendMissionPresenter';


interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    title: string;
    gameItemService: GameItemService;
    weekendMissionStage: WeekendMissionStage;
    status: NetworkState;

    weekendMissionJson: LocaleKey;
    season: string;
    level: number;
    maxLevel: number;
    minLevel: number;
}

export class WeekendMissionContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.weekendMission),
            gameItemService: new GameItemService(),
            weekendMissionStage: anyObject,
            status: NetworkState.Loading,

            weekendMissionJson: LocaleKey.weekendMissionSeason1Json,
            season: '',
            level: 0,
            maxLevel: 0,
            minLevel: 0,
        };
    }

    componentDidMount() {
        this.fetchWeekendMissionStage({
            weekendMissionJson: this.props.location?.state?.weekendMissionJson,
            season: this.props.location?.state?.season,
            level: this.props.location?.state?.level,
            maxLevel: this.props.location?.state?.maxLevel,
            minLevel: this.props.location?.state?.minLevel,
        });
    }

    fetchWeekendMissionStage = async (wmProperties: any) => {
        var weekendMissionResult = await this.state.gameItemService.getWeekendMissionStage(wmProperties.weekendMissionJson, wmProperties.season, wmProperties.level);
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
                status: NetworkState.Success,

                weekendMissionJson: wmProperties.weekendMissionJson,
                season: wmProperties.season,
                level: wmProperties.level,
                maxLevel: wmProperties.maxLevel,
                minLevel: wmProperties.minLevel,
            }
        });
    }

    navigateToWeekendMissionLevel = (newLevel: number) => {
        this.setState(() => {
            return {
                status: NetworkState.Loading,
            }
        });
        this.fetchWeekendMissionStage({ ...this.state, level: newLevel });
    }

    render() {
        return (
            <WeekendMissionPresenter
                {...this.state} {...this.props}
                navigateToWeekendMissionLevel={this.navigateToWeekendMissionLevel}
            />
        );
    }
}

export const WeekendMissionContainer = withRouter(WeekendMissionContainerUnconnected);