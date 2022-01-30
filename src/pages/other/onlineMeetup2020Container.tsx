import React, { useEffect, useState } from 'react';
import { NetworkState } from '../../constants/NetworkState';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ApiService } from '../../services/api/ApiService';
import { OnlineMeetup2020SubmissionPresenter } from './onlineMeetup2020Presenter';

interface IWithDepInj {
    apiService: ApiService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const OnlineMeetup2020SubmissionContainerUnconnected: React.FC<IProps> = (props: IProps) => {

    const [items, setItems] = useState<Array<OnlineMeetup2020SubmissionViewModel>>([]);
    const [status, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchOnlineMeetupSubmissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOnlineMeetupSubmissions = async () => {
        const itemsResult = await props.apiService.getOnlineMeetupSubmissions();
        if (!itemsResult.isSuccess) {
            setStatus(NetworkState.Error);
            return;
        }
        setItems(itemsResult.value);
        setStatus(NetworkState.Success);
    }

    return (
        <OnlineMeetup2020SubmissionPresenter
            {...props}
            items={items}
            status={status}
        />
    );
}

export const OnlineMeetup2020SubmissionContainer = withServices<IWithoutDepInj, IWithDepInj>(
    OnlineMeetup2020SubmissionContainerUnconnected,
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
    })
);