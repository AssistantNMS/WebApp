import React, { ReactNode, useRef, useState } from 'react';
import { translate } from '../../localization/Translate';
import { AssistantAppsContent } from '../../components/common/about/assistantAppsContent';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { AboutAppContent } from './aboutAppContent';
import { AboutTeamContent } from './aboutTeamContent';
import { SegmentedControl } from '../../components/common/segmentedControl';

interface IAboutTabs {
  text: string;
  ref: React.MutableRefObject<unknown>;
  displayFunc: () => ReactNode;
}

export const AboutPresenter: React.FC = () => {
  const options: Array<IAboutTabs> = [
    {
      text: 'AssistantApps',
      ref: useRef(),
      displayFunc: () => <AssistantAppsContent />,
    },
    {
      text: LocaleKey.about,
      ref: useRef(),
      displayFunc: () => <AboutAppContent />,
    },
    {
      text: 'Team',
      ref: useRef(),
      displayFunc: () => <AboutTeamContent />,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<IAboutTabs>(options[0]);
  const title = translate(LocaleKey.about);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1">
          <div className="row justify">
            <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10 col-xs-10 mt-1em mb-2em">
              <SegmentedControl
                name="aboutTabs"
                controlRef={useRef()}
                defaultIndex={options.findIndex((opt) => opt.text === selectedOption.text)}
                options={options.map((opt) => ({
                  label: translate(opt.text),
                  value: opt.text,
                  ref: opt.ref,
                  // default: selectedOption.text === opt.text,
                }))}
                callback={(optText) => {
                  const opt = options.find((o) => o.text === optText);
                  if (opt != null) setSelectedOption(opt);
                }}
              />
            </div>
          </div>
          <div className="row justify mb-1em">
            <div className="col-12">{selectedOption.displayFunc()}</div>
          </div>
        </div>
      </div>
    </DefaultAnimation>
  );
};
