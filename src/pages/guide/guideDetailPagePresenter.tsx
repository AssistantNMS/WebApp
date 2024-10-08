import React from 'react';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { GuideSection } from '../../contracts/guide/guideSection';
import { GuideSectionItem } from '../../contracts/guide/guideSectionItem';
import { GuideType } from '../../contracts/guide/guideType';
import { guideFormatDate } from '../../helper/dateHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { GuideService } from '../../services/json/GuideService';
import {
  displaySectionImageItem,
  displaySectionLinkItem,
  displaySectionMarkdownItem,
  displaySectionTable,
  displaySectionTextItem,
} from './guideComponents';

interface IProps {
  // Container Props

  // Container State
  guideService: GuideService;
  guide?: Guide;
  guideMeta?: GuideMetaViewModel;
  status: NetworkState;

  // Container Specific
  likeGuide: () => void;
}

export const GuideDetailPagePresenter: React.FC<IProps> = (props: IProps) => {
  const handleLoadingOrError = () => {
    if (props.status === NetworkState.Loading) return;
    if (props.status === NetworkState.Error || !props.guide || !props.guide.sections) {
      return <h2>{translate(LocaleKey.noItems)}</h2>;
    }
    return displayGuide(props.guide);
  };

  const displayGuide = (guide: Guide) => {
    return (
      <>
        <h2>{guide.title}</h2>
        <h4>{guide.author}</h4>
        <h4>{guideFormatDate(guide.date)}</h4>
        {guide.sections.map(displaySection)}
        {props.guideMeta != null ? (
          <div className="section row">
            <div className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 item">
              <div className="row">
                <div className="col-6">
                  <h3 onClick={props.likeGuide} className="metaData pointer">
                    <i className="material-icons">thumb_up</i>&nbsp;
                    {props.guideMeta.likes}
                  </h3>
                </div>
                <div className="col-6">
                  <h3 className="metaData">
                    <i className="material-icons">remove_red_eye</i>&nbsp;
                    {props.guideMeta.views}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const displaySection = (section: GuideSection, index: number) => {
    return (
      <div key={`${section.heading}-${index}`} className="section row">
        {section.heading?.length > 0 && <h3 className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-xs-12 heading">{section.heading}</h3>}
        {section.items.map(displaySectionItem)}
      </div>
    );
  };

  const displaySectionItem = (sectionItem: GuideSectionItem, index: number) => {
    if (sectionItem.type === GuideType.Text) return displaySectionTextItem(sectionItem, index);
    if (sectionItem.type === GuideType.Link) return displaySectionLinkItem(sectionItem, index);
    if (sectionItem.type === GuideType.Image) return displaySectionImageItem(sectionItem, props.guide?.folder, index);
    if (sectionItem.type === GuideType.Markdown) return displaySectionMarkdownItem(sectionItem, index);
    if (sectionItem.type === GuideType.Table) return displaySectionTable(sectionItem, index);
    // return <h3>{sectionItem.type}</h3>
    return null;
  };

  const title = props.guide?.title ?? translate(LocaleKey.guides) ?? 'Guide';
  const description =
    props.guide?.author ?? //
    guideFormatDate(props.guide?.date ?? Date()) ??
    props.guide?.title ??
    props.guide?.shortTitle ??
    'Unknown';
  return (
    <DefaultAnimation>
      <HeadComponent title={title} description={description} />
      <NavBar title={title} />
      <div className="guide content">
        <div className="container full pt1 pb5">
          <div className="row">
            <div className="col-12 guide">{handleLoadingOrError()}</div>
          </div>
        </div>
      </div>
    </DefaultAnimation>
  );
};
