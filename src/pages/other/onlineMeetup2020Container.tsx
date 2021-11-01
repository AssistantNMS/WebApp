import React from 'react';
import { NetworkState } from '../../constants/NetworkState';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ApiService } from '../../services/api/ApiService';
import { OnlineMeetup2020SubmissionPresenter } from './onlineMeetup2020Presenter';

interface IWithDepInj {
    apiService: ApiService;
}
interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    items: Array<OnlineMeetup2020SubmissionViewModel>;
    status: NetworkState;
}

export class OnlineMeetup2020SubmissionContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: [],
            status: NetworkState.Loading,
        }
        this.fetchOnlineMeetupSubmissions();
    }

    fetchOnlineMeetupSubmissions = async () => {
        const itemsResult = await this.props.apiService.getOnlineMeetupSubmissions();
        if (!itemsResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                items: itemsResult.value,
                status: NetworkState.Success
            };
        })
    }

    render() {
        return (
            <OnlineMeetup2020SubmissionPresenter
                {...this.state} {...this.props}
            />
        );
    }
}

export const OnlineMeetup2020SubmissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
    OnlineMeetup2020SubmissionContainerUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
    })
);