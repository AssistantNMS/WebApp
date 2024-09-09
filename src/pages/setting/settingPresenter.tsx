import React from 'react';
import { connect } from 'react-redux';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { LocalizationMap } from '../../localization/LocalizationMap';
import { translate } from '../../localization/Translate';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './setting.Redux';
import { BoolSettingTile, ControlPlatformSettingTile, FontSettingTile, LangSettingTile } from './settingComponent';

interface IWithDepInj {}
interface IWithoutDepInj {}
interface IProps extends IWithoutDepInj, IReduxProps {}

const SettingPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
  const title = translate(LocaleKey.settings);

  const selectLanguage = (locale: LocalizationMap) => {
    if (props.setLanguage != null) {
      props.setLanguage(locale.code);
    }
  };

  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content settings">
        <div className="container full pt1">
          <div className="row">
            <LangSettingTile title={translate(LocaleKey.appLanguage)} value={props.selectedLanguage} onClick={selectLanguage} />
            <BoolSettingTile title={translate(LocaleKey.useAltGlyphs)} value={props.useAltGlyphs} onClick={props.toggleAltGlyphs} />
            <FontSettingTile title={translate(LocaleKey.settingsFont)} value={props.selectedFont} onClick={props.setFont} />
            <ControlPlatformSettingTile title={translate(LocaleKey.platform)} value={props.selectedPlatform} onClick={props.setPlatform} />
          </div>
        </div>
      </div>
    </DefaultAnimation>
  );
};

export const SettingPresenter = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(SettingPresenterUnconnected),
  () => ({}),
);
