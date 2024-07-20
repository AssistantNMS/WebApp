import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';

export const DonationPresenter: React.FC = () => {
  const title = translate(LocaleKey.donation);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1">
          <div className="row">
            <div className="col-12">
              <h3>{translate(LocaleKey.donationDescrip)}</h3>
            </div>
          </div>
          <div className="row justify">
            <assistant-apps-donation-option-list></assistant-apps-donation-option-list>
          </div>
        </div>
      </div>
    </DefaultAnimation>
  );
};
