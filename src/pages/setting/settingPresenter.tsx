import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';

import { NavBar } from '../../components/core/navbar/navbar';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { LocaleKey } from '../../localization/LocaleKey';

import { boolSettingTile, LangSettingTile } from './settingComponent';

import { mapStateToProps, mapDispatchToProps } from './setting.Redux';

interface IProps {
    isDark: boolean;
    selectedLanguage: string;
    setDarkMode: (isDark: boolean) => void;
    setLanguage: (selectedLanguage: string) => void;
}

const SettingPresenterUnconnected: React.FC<IProps> = (props: IProps) => {

    const title = i18next.t(LocaleKey.donation);
    setDocumentTitle(title);
    return (
        <>
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <LangSettingTile title={i18next.t(LocaleKey.appLanguage)}
                            value={props.selectedLanguage}
                            onClick={props.setLanguage}
                        />
                        {boolSettingTile(i18next.t(LocaleKey.darkModeEnabled), props.isDark, props.setDarkMode)}
                    </div>
                </div>
            </div>
        </>
    );
}

export const SettingPresenter = connect(mapStateToProps, mapDispatchToProps)(SettingPresenterUnconnected);