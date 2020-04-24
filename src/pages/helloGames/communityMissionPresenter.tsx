import i18next from 'i18next';
import { connect } from 'react-redux';
import React from 'react';

import { mapStateToProps, mapDispatchToProps } from './communityMission.Redux';

import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';
import { SmallLoading } from '../../components/core/loading/loading';
import { ProgressBar } from '../../components/common/progressBar/progressBar';
import { NetworkState } from '../../constants/NetworkState';
import { PlatformType, ToFriendlyPlatfromString } from '../../contracts/enum/PlatformType';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { anyObject } from '../../helper/TypescriptHacks';


import { ApiService } from '../../services/ApiService';

var SegmentedControl = require('segmented-control');

interface IProps {
    chosenPlatform: PlatformType;
    setPlatform: (platform: PlatformType) => void;
}

interface IState {
    title: string;
    apiService: ApiService;
    communityMission: CommunityMissionViewModel;
    status: NetworkState;
}

export class CommunityMissionPresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const title = i18next.t(LocaleKey.communityMission);
        setDocumentTitle(title);

        this.state = {
            title,
            apiService: new ApiService(),
            communityMission: anyObject,
            status: NetworkState.Loading
        };
        this.fetchCommunityMission(this.props.chosenPlatform);
    }

    fetchCommunityMission = async (plat: PlatformType) => {
        var communityMissionResult = await this.state.apiService.getCommunityMission(plat);
        if (!communityMissionResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                communityMission: communityMissionResult.value,
                status: NetworkState.Success
            }
        });
    }

    handleLoadingOrError = () => {
        if (this.state.status === NetworkState.Loading) return SmallLoading();
        if (this.state.status === NetworkState.Error ||
            !this.state.communityMission ||
            !this.state.communityMission.missionId) {
            return (<h2 className="pt1">{i18next.t(LocaleKey.somethingWentWrong)}</h2>);
        }
        return this.displayCommunityMissiondata(this.state.communityMission);
    }

    displayCommunityMissiondata = (communityMission: CommunityMissionViewModel) => {
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

    changePlatform = (plat: PlatformType) => {
        if (plat === this.props.chosenPlatform) return;
        this.setState(() => {
            return {
                status: NetworkState.Loading
            }
        }, () => {
            this.fetchCommunityMission(plat);
            this.props.setPlatform(plat);
        }
        );
    }

    createOption = (plat: PlatformType, selectedPlat: PlatformType) => {
        return { label: ToFriendlyPlatfromString(plat), value: plat, default: plat === selectedPlat };
    }

    render() {
        return (
            <>
                <NavBar title={this.state.title} />
                <div className="content">
                    <div className="container full pt1">
                        <div className="row">
                            <div className="col-12">
                                <SegmentedControl.SegmentedControl
                                    name="platformChoice"
                                    options={[
                                        this.createOption(PlatformType.PC, this.props.chosenPlatform),
                                        this.createOption(PlatformType.PS4, this.props.chosenPlatform),
                                        this.createOption(PlatformType.XB1, this.props.chosenPlatform),
                                    ]}
                                    setValue={this.changePlatform}
                                />
                            </div>
                        </div>
                        {this.handleLoadingOrError()}
                    </div>
                </div>
            </>
        );
    }
}

export const CommunityMissionPresenter = connect(mapStateToProps, mapDispatchToProps)(CommunityMissionPresenterUnconnected);
