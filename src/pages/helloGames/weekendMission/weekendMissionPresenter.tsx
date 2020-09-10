import i18next from 'i18next';
import React from 'react';
import { ApiService } from '../../../services/ApiService';
import { WeekendMissionViewModel } from '../../../contracts/generated/Model/HelloGames/weekendMissionViewModel';
import { NetworkState } from '../../../constants/NetworkState';
import { LocaleKey } from '../../../localization/LocaleKey';
import { SmallLoading } from '../../../components/core/loading/loading';
import { NavBar } from '../../../components/core/navbar/navbar';
import { HeadComponent } from '../../../components/core/headComponent';
import { WeekendMissionStage } from '../../../contracts/helloGames/weekendMissionStage';


interface IProps {
    // Container Props

    // Container State
    title: string;
    apiService: ApiService;
    weekendMissionStage: WeekendMissionStage;
    status: NetworkState;

    // Container Specific
}

export const WeekendMissionPresenter: React.FC<IProps> = (props: IProps) => {

    const handleLoadingOrError = (displayFunc: (props: IProps) => void) => {
        if (props.status === NetworkState.Loading) return SmallLoading();
        if (props.status === NetworkState.Error ||
            !props.weekendMissionStage ||
            !props.weekendMissionStage.AppId) {
            return (<h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>);
        }
        return displayFunc(props);
    }

    const displayWeekendMissionData = (weekendMission: WeekendMissionStage) => {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>
                            yes
                        </h3>
                    </div>
                </div>
            </>
        );
    }



    return (
        <>
            <HeadComponent title={props.title} />
            <NavBar title={props.title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                        </div>
                    </div>
                    {handleLoadingOrError((localProps: IProps) => displayWeekendMissionData(localProps.weekendMissionStage))}
                </div>
            </div>
        </>
    );
}
