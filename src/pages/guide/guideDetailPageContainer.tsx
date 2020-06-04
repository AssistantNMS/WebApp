import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/ApiService';
import { GuideService } from '../../services/GuideService';
import { GuideDetailPagePresenter } from './guideDetailPagePresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    apiService: ApiService;
    guideService: GuideService;
    guide?: Guide;
    guideMeta?: GuideMetaViewModel;
    status: NetworkState;
}

export class GuideDetailPageContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            status: NetworkState.Loading,
            apiService: new ApiService(),
            guideService: new GuideService(),
        }
    }

    componentDidMount() {
        const guid = this.props.match?.params?.guid;
        this.fetchData(guid);
        this.fetchMetaData(guid);
    }

    fetchData = async (guideGuid: string) => {
        var guideResult = await this.state.guideService.getSpecificGuide(guideGuid);
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
        var guideMetaResult = await this.state.apiService.getGuideMetaData(guideGuid);
        if (!guideMetaResult.isSuccess) return;
        this.setState(() => {
            return {
                guideMeta: guideMetaResult.value
            }
        });
    }

    likeGuide = async () => {
        var guid = this.state.guide?.guid;
        if (!guid) return;
        var likeResult = await this.state.apiService.likeGuide(guid);
        if (likeResult.isSuccess) {
            Swal.fire({ icon: 'success', title: '👍' });
            var newGuideMeta: any = { ...this.state.guideMeta };
            newGuideMeta.likes = (this.state.guideMeta?.likes ?? 0) + 1;
            this.setState(() => {
                return {
                    guideMeta: newGuideMeta
                }
            });
        } else {
            Swal.fire({ icon: 'error', title: i18next.t(LocaleKey.error), text: 'Your \'like\' was not submitted' });
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

export const GuideDetailPageContainer = withRouter(GuideDetailPageContainerUnconnected);