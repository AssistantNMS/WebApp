import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { Guide } from '../../contracts/guide/guide';
import { LocaleKey } from '../../localization/LocaleKey';
import { GuideService } from '../../services/GuideService';
import { GuidePagePresenter } from './guidePagePresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
}

interface IState {
    title: string;
    guideService: GuideService;
    guideItems: Guide[];
    status: NetworkState;
}

export class GuidePageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            title: i18next.t(LocaleKey.guides),
            guideService: new GuideService(),
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
        const itemsResult = await this.state.guideService.getListOfGuides();
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

export const GuidePageContainer = withRouter(GuidePageContainerUnconnected);