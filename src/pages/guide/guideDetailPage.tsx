import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';

import { Guide } from '../../contracts/guide/guide';
import { NetworkState } from '../../constants/NetworkState';
import { GuideService } from '../../services/GuideService';

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    title: string;
    guideService: GuideService;
    guide?: Guide;
    status: NetworkState;
}

export class GuideDetailPagePresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const title = i18next.t(LocaleKey.guides);
        setDocumentTitle(title);

        this.state = {
            title,
            status: NetworkState.Loading,
            guideService: new GuideService(),
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match?.params?.guid);
    }

    fetchData = async (guideGuid: string) => {
        var guideResult = await this.state.guideService.getSpecificGuide(guideGuid);
        if (!guideResult.isSuccess) return;
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

    displayGuide = () => {
        if (this.state.status === NetworkState.Loading) return;
        if (this.state.status === NetworkState.Error ||
            !this.state.guide) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return (<h2>{this.state.guide?.title ?? 'Unknown'}</h2>);
    }

    render() {
        return (
            <>
                <NavBar title={this.state.title} />
                <div className="content">
                    <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                        <div className="row">
                            <div className="col-12">
                                {this.displayGuide()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export const GuideDetailPagePresenter = withRouter(GuideDetailPagePresenterUnconnected);