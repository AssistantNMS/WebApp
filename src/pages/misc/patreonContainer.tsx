import i18next from 'i18next';
import React from 'react';
import { NetworkState } from '../../constants/NetworkState';
import { PatreonViewModel } from '../../contracts/generated/Model/AssistantApps/patreonViewModel';
import { LocaleKey } from '../../localization/LocaleKey';
import { AssistantAppsApiService } from '../../services/AssistantAppsApiService';
import { PatreonPresenter } from './patreonPresenter';

interface IProps {
}

interface IState {
    title: string;
    apiService: AssistantAppsApiService;
    patreonItems: Array<PatreonViewModel>;
    status: NetworkState;
}

export class PatreonContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.patreon),
            apiService: new AssistantAppsApiService(),
            patreonItems: [],
            status: NetworkState.Loading
        };
        this.fetchPatrons();
    }

    fetchPatrons = async () => {
        var patronListResult = await this.state.apiService.getPatronsList();
        if (!patronListResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                patreonItems: patronListResult.value,
                status: NetworkState.Success
            }
        });
    }
    render() {
        return (
            <PatreonPresenter {...this.state} />
        );
    }
}

