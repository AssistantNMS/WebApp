import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GuideCardListTile } from '../../components/tilePresenter/guideItemListTile/guideCardListTile';
import { NetworkState } from '../../constants/NetworkState';
import { Guide } from '../../contracts/guide/guide';
import { LocaleKey } from '../../localization/LocaleKey';
import { GuideService } from '../../services/GuideService';




interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    title: string;
    guideService: GuideService;
    guideItems: Guide[];
    status: NetworkState;
}

export class GuidePagePresenterUnconnected extends React.Component<IProps, IState> {
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

    fetchData = async () => {
        var itemsResult = await this.state.guideService.getListOfGuides();
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

    displayGuides = () => {
        if (this.state.status === NetworkState.Loading) return;
        if (this.state.status === NetworkState.Error ||
            !this.state.guideItems ||
            this.state.guideItems.length < 1) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return (<GenericListPresenter list={this.state.guideItems} presenter={GuideCardListTile} />);
    }

    render() {
        return (
            <>
                <HeadComponent title={this.state.title} />
                <NavBar title={this.state.title} />
                <div className="content">
                    <div className="container full pt1">
                        <div className="row">
                            <div className="col-12">
                                {this.displayGuides()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export const GuidePagePresenter = withRouter(GuidePagePresenterUnconnected);