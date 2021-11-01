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
import { ApiService } from '../../services/api/ApiService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';

interface IWithDepInj {
    apiService: ApiService;
}
interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

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
        const communityMissionResult = await this.props.apiService.getCommunityMission();
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


export const CommunityMissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CommunityMissionContainerUnconnected),
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
    })
);