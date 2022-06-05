import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/Translate';
import { NetworkState } from '../../constants/NetworkState';
import { QuicksilverStore } from '../../contracts/data/quicksilver';
import { CommunityMissionViewModel } from '../../contracts/generated/communityMissionViewModel';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { DataJsonService } from '../../services/json/DataJsonService';
import { mapDispatchToProps, mapStateToProps } from './communityMission.Redux';
import { CommunityMissionPresenter } from './communityMissionPresenter';

interface IWithDepInj {
    apiService: ApiService;
    dataJsonService: DataJsonService;
}
interface IWithoutDepInj {
}

interface IFromRedux {
    selectedLanguage: string
}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj { }

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
            title: translate(LocaleKey.communityMission),
            communityMission: anyObject,
            quicksilverStoreItems: [],
            status: NetworkState.Loading
        };
        this.fetchCommunityMission();
    }

    fetchCommunityMission = async () => {
        const communityMissionTask = this.props.apiService.getCommunityMission();
        const quickSilverStoreItemsTask = this.props.dataJsonService.getQuicksilverStore();

        const communityMissionResult = await communityMissionTask;
        const quickSilverStoreItems = await quickSilverStoreItemsTask;

        if ((communityMissionResult?.isSuccess ?? false) === false || (quickSilverStoreItems?.isSuccess ?? false) === false) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }

        this.setState(() => {
            return {
                quicksilverStoreItems: quickSilverStoreItems.value,
                communityMission: communityMissionResult.value,
                status: NetworkState.Success
            }
        });
    }

    render() {
        return (
            <CommunityMissionPresenter
                key={this.props.selectedLanguage}
                {...this.state} {...this.props}
            />
        );
    }
}

export const CommunityMissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(CommunityMissionContainerUnconnected),
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        dataJsonService: services.dataJsonService,
    })
);