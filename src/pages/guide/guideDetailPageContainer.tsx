import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { errorDialog, successDialog } from '../../helper/dialogHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { GuideService } from '../../services/json/GuideService';
import { GuideDetailPagePresenter } from './guideDetailPagePresenter';

interface IWithDepInj {
    guideService: GuideService;
    apiService: ApiService;
}
interface IWithoutDepInj {
    location: any;
    match: any;
    history: any;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

interface IState {
    guide?: Guide;
    guideMeta?: GuideMetaViewModel;
    status: NetworkState;
}

export class GuideDetailPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            status: NetworkState.Loading,
        }
    }

    componentDidMount() {
        const guid = this.props.match?.params?.guid;
        this.fetchData(guid);
        this.fetchMetaData(guid);
    }

    fetchData = async (guideGuid: string) => {
        const guideResult = await this.props.guideService.getSpecificGuide(guideGuid);
        if (!guideResult.isSuccess) {
            this.setState(() => {
                return {
                    status: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                guide: guideResult.value,
                status: NetworkState.Success
            }
        });
    }

    fetchMetaData = async (guideGuid: string) => {
        const guideMetaResult = await this.props.apiService.getGuideMetaData(guideGuid);
        if (!guideMetaResult.isSuccess) return;
        this.setState(() => {
            return {
                guideMeta: guideMetaResult.value
            }
        });
    }

    likeGuide = async () => {
        const guid = this.state.guide?.guid;
        if (!guid) return;
        const likeResult = await this.props.apiService.likeGuide(guid);
        if (likeResult.isSuccess) {
            successDialog('👍', '');
            const newGuideMeta: any = { ...this.state.guideMeta };
            newGuideMeta.likes = (this.state.guideMeta?.likes ?? 0) + 1;
            this.setState(() => {
                return {
                    guideMeta: newGuideMeta
                }
            });
        } else {
            errorDialog(i18next.t(LocaleKey.error), 'Your \'like\' was not submitted');
        }
    }

    render() {
        return (
            <GuideDetailPagePresenter
                {...this.state} {...this.props}
                likeGuide={this.likeGuide}
            />
        );
    }
}

export const GuideDetailPageContainer = withServices<IWithoutDepInj, IWithDepInj>(
    withRouter(GuideDetailPageContainerUnconnected),
    (services: IDependencyInjection) => ({
        guideService: services.guideService,
        apiService: services.apiService,
    })
);