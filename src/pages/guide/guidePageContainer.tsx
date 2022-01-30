import i18next from 'i18next';
import React from 'react';

import { NetworkState } from '../../constants/NetworkState';
import { Guide } from '../../contracts/guide/guide';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { GuideService } from '../../services/json/GuideService';
import { GuidePagePresenter } from './guidePagePresenter';

interface IWithDepInj {
    guideService: GuideService;
}
interface IWithoutDepInj {
    selectedLanguage?: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    title: string;
    guideItems: Guide[];
    status: NetworkState;
}

export class GuidePageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.guides),
            guideItems: [],
            status: NetworkState.Loading,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const prevSelectedLanguage = prevProps.selectedLanguage;
        if (this.props.selectedLanguage !== prevSelectedLanguage) {
            this.clearData();
            this.fetchData();
        }
    }

    clearData = async () => {
        this.setState(() => {
            return {
                status: NetworkState.Loading,
                guideItems: []
            }
        });
    }

    fetchData = async () => {
        const itemsResult = await this.props.guideService.getListOfGuides();
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
                guideItems: itemsResult.value,
                status: NetworkState.Success
            }
        });
    }

    render() {
        return (
            <GuidePagePresenter {...this.state} />
        );
    }
}

export const GuidePageContainer = withServices<IWithoutDepInj, IWithDepInj>(
    GuidePageContainerUnconnected,
    (services: IDependencyInjection) => ({
        guideService: services.guideService,
    })
);