import i18next from 'i18next';
import React from 'react';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { PlatformType, ToFriendlyPlatfromString } from '../../contracts/enum/PlatformType';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/ApiService';

var SegmentedControl = require('segmented-control');

interface IProps {
    chosenPlatform: PlatformType;
    setPlatform: (platform: PlatformType) => void;
    title: string;
    apiService: ApiService;
    communityMission: CommunityMissionViewModel;
    status: NetworkState;
    changePlatform: (plat: PlatformType) => void;
}

export const CommunityMissionPresenter: React.FC<IProps> = (props: IProps) => {
    const createOption = (plat: PlatformType, selectedPlat: PlatformType) => {
        return { label: ToFriendlyPlatfromString(plat), value: plat, default: plat === selectedPlat };
    }

    const handleLoadingOrError = () => {
        if (props.status === NetworkState.Loading) return SmallLoading();
        if (props.status === NetworkState.Error ||
            !props.communityMission ||
            !props.communityMission.missionId) {
            return (<h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>);
        }
        return displayCommunityMissiondata(props.communityMission);
    }

    const displayCommunityMissiondata = (communityMission: CommunityMissionViewModel) => {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h3>
                            {i18next.t(LocaleKey.researchProgress)}<br />
                            {communityMission.currentTier} / {communityMission.totalTiers}
                        </h3>
                    </div>
                    <div className="col-12">
                        <ProgressBar percentage={communityMission.percentage} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            i18next.t(LocaleKey.communityMissionContent).split('\n').map((text: string, index: number) => (
                                <h3 key={`communityMissionContent-${index}`}>
                                    {text}
                                </h3>
                            ))
                        }
                    </div>
                </div>
                <hr />
                <div className="row justify">
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
                            <SegmentedControl.SegmentedControl
                                name="platformChoice"
                                options={[
                                    createOption(PlatformType.PC, props.chosenPlatform),
                                    createOption(PlatformType.PS4, props.chosenPlatform),
                                    createOption(PlatformType.XB1, props.chosenPlatform),
                                ]}
                                setValue={props.changePlatform}
                            />
                        </div>
                    </div>
                    {handleLoadingOrError()}
                </div>
            </div>
        </>
    );
}
