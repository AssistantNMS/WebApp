import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { NetworkState } from '../../constants/NetworkState';
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
        this.fetchCommunityMission();
    }

    fetchCommunityMission = async () => {
        var communityMissionResult = await this.props.services.apiService.getCommunityMission();
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

    render() {
        return (
            <CommunityMissionPresenter
                {...this.state} {...this.props}
            />
        );
    }
}

export const CommunityMissionContainer = connect(mapStateToProps, mapDispatchToProps)(withServices(CommunityMissionContainerUnconnected));
