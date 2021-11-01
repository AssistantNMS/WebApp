import i18next from 'i18next';
import React from 'react';
import { NetworkState } from '../../constants/NetworkState';
import { PatreonViewModel } from '../../contracts/generated/AssistantApps/ViewModel/patreonViewModel';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { AssistantAppsApiService } from '../../services/api/AssistantAppsApiService';
import { PatreonPresenter } from './patreonPresenter';

interface IWithDepInj {
    assistantAppsApiService: AssistantAppsApiService;
}
interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    title: string;
    patreonItems: Array<PatreonViewModel>;
    status: NetworkState;
}

export class PatreonContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.patreon),
            patreonItems: [],
            status: NetworkState.Loading
        };
        this.fetchPatrons();
    }

    fetchPatrons = async () => {
        const patronListResult = await this.props.assistantAppsApiService.getPatronsList();
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

export const PatreonContainer = withServices<IWithoutDepInj, IWithDepInj>(
    PatreonContainerUnconnected,
    (services: IDependencyInjection) => ({
        assistantAppsApiService: services.assistantAppsApiService,
    })
);