import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { GuideSection } from '../../contracts/guide/guideSection';
import { GuideSectionItem } from '../../contracts/guide/guideSectionItem';
import { GuideType } from '../../contracts/guide/guideType';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/ApiService';
import { GuideService } from '../../services/GuideService';
import { displaySectionImageItem, displaySectionLinkItem, displaySectionMarkdownItem, displaySectionTable, displaySectionTextItem } from './guideComponents';
import Swal from 'sweetalert2';





var moment = require('moment');

interface IProps {
    location: any;
    match: any;
    history: any;
}

interface IState {
    title: string;
    apiService: ApiService;
    guideService: GuideService;
    guide?: Guide;
    guideMeta?: GuideMetaViewModel;
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
            newGuideMeta.likes = this.state.guideMeta?.likes ?? 0 + 1;
            this.setState(() => {
                return {
                    guideMeta: newGuideMeta
                }
            });
        } else {
            Swal.fire({ icon: 'error', title: i18next.t(LocaleKey.error), text: 'Your \'like\' was not submitted' });
        }
    }

    handleLoadingOrError = () => {
        if (this.state.status === NetworkState.Loading) return;
        if (this.state.status === NetworkState.Error ||
            !this.state.guide ||
            !this.state.guide.sections) {
            return (<h2>{i18next.t(LocaleKey.noItems)}</h2>);
        }
        return this.displayGuide(this.state.guide);
    }

    displayGuide = (guide: Guide) => {
        return <>
            <h2>{guide.title}</h2>
            <h4>{guide.author}</h4>
            <h4>{moment(guide.date).format('DD MMM YYYY')}</h4>
            {
                guide.sections.map(this.displaySection)
            }
            {
                (this.state.guideMeta != null)
                    ? <div className="section row">
                        <div className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item">
                            <div className="row">
                                <div className="col-6">
                                    <h3 onClick={this.likeGuide} className="metaData pointer">
                                        <i className="material-icons">thumb_up</i>&nbsp;{this.state.guideMeta.likes}
                                    </h3>
                                </div>
                                <div className="col-6">
                                    <h3 className="metaData">
                                        <i className="material-icons">remove_red_eye</i>&nbsp;{this.state.guideMeta.views}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>;
    }

    displaySection = (section: GuideSection, index: number) => {
        return <div key={`${section.heading}-${index}`} className="section row">
            <h3 className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 heading">
                {section.heading}
            </h3>
            {
                section.items.map(this.displaySectionItem)
            }
        </div>
    }

    displaySectionItem = (sectionItem: GuideSectionItem, index: number) => {
        if (sectionItem.type === GuideType.Text) return displaySectionTextItem(sectionItem, index);
        if (sectionItem.type === GuideType.Link) return displaySectionLinkItem(sectionItem, index);
        if (sectionItem.type === GuideType.Image) return displaySectionImageItem(sectionItem, this.state.guide?.folder, index);
        if (sectionItem.type === GuideType.Markdown) return displaySectionMarkdownItem(sectionItem, index);
        if (sectionItem.type === GuideType.Table) return displaySectionTable(sectionItem, index);
        // return <h3>{sectionItem.type}</h3>
        return null;
    }

    render() {
        return (
            <>
                <NavBar title={this.state.title} />
                <div className="content">
                    <div className="container full pt1 pb5">
                        <div className="row">
                            <div className="col-12 guide">
                                {this.handleLoadingOrError()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export const GuideDetailPagePresenter = withRouter(GuideDetailPagePresenterUnconnected);