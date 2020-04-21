import i18next from 'i18next';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { NavBar } from '../../components/core/navbar/navbar';

import { Guide } from '../../contracts/guide/guide';
import { NetworkState } from '../../constants/NetworkState';
import { GuideService } from '../../services/GuideService';
import { GuideSection } from '../../contracts/guide/guideSection';
import { GuideSectionItem } from '../../contracts/guide/guideSectionItem';
import { GuideType } from '../../contracts/guide/guideType';

import { displaySectionTextItem, displaySectionLinkItem, displaySectionImageItem, displaySectionMarkdownItem, displaySectionTable } from './guideComponents';

var moment = require('moment');

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