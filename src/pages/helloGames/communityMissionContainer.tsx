import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { NetworkState } from '../../constants/NetworkState';
import { PlatformType } from '../../contracts/enum/PlatformType';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './communityMission.Redux';
import { CommunityMissionPresenter } from './communityMissionPresenter';
import { QuicksilverStore } from '../../contracts/data/quicksilver';
import * as quicksilverJson from '../../assets/data/quicksilverStore.json';
import { IServices, withServices } from '../../components/core/servicesProvider';

interface IProps {
    services: IServices;
    chosenPlatform: PlatformType;
    setPlatform: (platform: PlatformType) => void;
}

interface IState {
    title: string;
    communityMission: CommunityMissionViewModel;
    quicksilverStoreItems: Array<QuicksilverStore>;
    status: NetworkState;
}

export class CommunityMissionContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.communityMission),
            communityMission: anyObject,
            quicksilverStoreItems: (quicksilverJson as any).default,
            status: NetworkState.Loading
        };
        this.fetchCommunityMission(this.props.chosenPlatform);
    }

    fetchCommunityMission = async (plat: PlatformType) => {
        if (plat === PlatformType.Unknown) plat = PlatformType.PC;
        var communityMissionResult = await this.props.services.apiService.getCommunityMission(plat);
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

    render() {
        return (
            <CommunityMissionPresenter
                {...this.state} {...this.props}
                changePlatform={this.changePlatform}
            />
        );
    }
}

export const CommunityMissionContainer = connect(mapStateToProps, mapDispatchToProps)(withServices(CommunityMissionContainerUnconnected));
