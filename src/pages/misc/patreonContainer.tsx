import i18next from 'i18next';
import React from 'react';
import { IServices, withServices } from '../../components/core/servicesProvider';
import { NetworkState } from '../../constants/NetworkState';
import { PatreonViewModel } from '../../contracts/generated/Model/AssistantApps/patreonViewModel';
import { LocaleKey } from '../../localization/LocaleKey';
import { PatreonPresenter } from './patreonPresenter';

interface IProps {
    services: IServices;
}

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
        var patronListResult = await this.props.services.assistantAppsApiService.getPatronsList();
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

export const PatreonContainer = withServices(PatreonContainerUnconnected);

