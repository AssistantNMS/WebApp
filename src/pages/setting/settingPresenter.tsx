import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';

import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './setting.Redux';
import { boolSettingTile, LangSettingTile } from './settingComponent';

interface IProps {
    useAltGlyphs: boolean;
    selectedLanguage: string;
    toggleAltGlyphs: () => void;
    setLanguage: (selectedLanguage: string) => void;
}

const SettingPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    const title = i18next.t(LocaleKey.donation);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <LangSettingTile title={i18next.t(LocaleKey.appLanguage)}
                            value={props.selectedLanguage}
                            onClick={props.setLanguage}
                        />
                        {boolSettingTile(i18next.t(LocaleKey.useAltGlyphs), props.useAltGlyphs, props.toggleAltGlyphs)}
                    </div>
                </div>
            </div>
        </>
    );
}

export const SettingPresenter = connect(mapStateToProps, mapDispatchToProps)(SettingPresenterUnconnected);