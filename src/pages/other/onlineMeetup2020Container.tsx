import React from 'react';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { OnlineMeetup2020SubmissionPresenter } from './onlineMeetup2020Presenter';
import { NetworkState } from '../../constants/NetworkState';
import { IServices, withServices } from '../../components/core/servicesProvider';

interface IProps {
    location: any;
    match: any;
    history: any;
    services: IServices;
}

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
        var itemsResult = await this.props.services.apiService.getOnlineMeetupSubmissions();
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

export const OnlineMeetup2020SubmissionContainer = withServices(OnlineMeetup2020SubmissionContainerUnconnected);
