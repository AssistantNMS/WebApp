import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IServices, withServices } from '../../components/core/servicesProvider';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { LocaleKey } from '../../localization/LocaleKey';
import { GuideService } from '../../services/GuideService';
import { GuideDetailPagePresenter } from './guideDetailPagePresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    services: IServices;
}

interface IState {
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
            guideService: new GuideService(),
        }
    }

    componentDidMount() {
        const guid = this.props.match?.params?.guid;
        this.fetchData(guid);
        this.fetchMetaData(guid);
    }

    fetchData = async (guideGuid: string) => {
        const guideResult = await this.state.guideService.getSpecificGuide(guideGuid);
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
        const guideMetaResult = await this.props.services.apiService.getGuideMetaData(guideGuid);
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
        const likeResult = await this.props.services.apiService.likeGuide(guid);
        if (likeResult.isSuccess) {
            Swal.fire({ icon: 'success', title: '👍' });
            const newGuideMeta: any = { ...this.state.guideMeta };
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

export const GuideDetailPageContainer = withServices(withRouter(GuideDetailPageContainerUnconnected));
