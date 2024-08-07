import React from 'react';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { CardButton } from '../../components/common/button/cardButton';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AnalyticsEvent } from '../../constants/AnalyticsEvent';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { LocaleKey } from '../../localization/LocaleKey';

export const LanguagePresenter: React.FC = () => {
  const buttons = [
    {
      title: translate(LocaleKey.useTranslationTool),
      event: AnalyticsEvent.externalLinkTranslationTool,
      url: ExternalUrls.translationTool,
    },
  ];
  const title = translate(LocaleKey.language);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1">
          <div className="row">
            <div className="col-12">
              <h3>{translate(LocaleKey.languageContent)}</h3>
            </div>
          </div>
          <div className="row justify">
            {buttons.map((button) => {
              return (
                <div key={button.title} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <CardButton className="center" title={button.title} url={button.url} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DefaultAnimation>
  );
};
