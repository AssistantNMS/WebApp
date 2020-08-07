import React from 'react';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { AssistantAppsApiService } from '../../services/AssistantAppsApiService';
import { OnlineMeetup2020SubmissionPresenter } from './onlineMeetup2020Presenter';
import { NetworkState } from '../../constants/NetworkState';

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    items: Array<OnlineMeetup2020SubmissionViewModel>;
    status: NetworkState;
}

export class OnlineMeetup2020SubmissionContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: [],
            status: NetworkState.Loading,
        }
        this.fetchOnlineMeetupSubmissions();
    }

    fetchOnlineMeetupSubmissions = async () => {
        var itemsResult = await new AssistantAppsApiService().getOnlineMeetupSubmissions();
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
