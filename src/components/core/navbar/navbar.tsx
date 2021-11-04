import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './navbar.Redux';

import { LocalizationMap } from '../../../localization/LocalizationMap';
import { localeMap } from '../../../localization/Localization';
import { BaseFloatingActionButton } from '../../floatingActionButton/baseFloatingActionButton';
import i18next from 'i18next';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IProps {
    title: string;
    setLanguage?: (langCode: string) => void;
    toggleMenu?: () => void;
    additionalItems?: Array<any>;
}

interface IState {
    langDropdownVisible: boolean,
    localeMap: LocalizationMap[]
}

class NavBarUnconnected extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            langDropdownVisible: false,
            localeMap: localeMap
        }
    }

    menuItemClick = () => {
        if (this.props.toggleMenu != null) {
            this.props.toggleMenu();
        }
    }

    showLangDropdown = () => {
        this.setState((prevState: IState) => {
            return {
                langDropdownVisible: !prevState.langDropdownVisible
            }
        });
    }

    selectLanguage = (locale: LocalizationMap) => {
        if (this.props.setLanguage != null) {
            this.props.setLanguage(locale.code);
        }
        this.setState((prevState: IState) => {
            return {
                langDropdownVisible: false
            }
        });
    }

    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler pointer" type="button" data-toggle="collapse" aria-controls="navigation-index"
                        aria-expanded="false" aria-label="Toggle navigation" onClick={this.menuItemClick}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                    </button>
                    <div className="navbar-wrapper">
                        <span className="navbar-brand noselect">{this.props.title}</span>
                    </div>
                    <div className="navbar-collapse justify-content-end">
                        {
                            this.state.langDropdownVisible
                                ? <div onClick={this.showLangDropdown} className="full-page-loader opacity80"></div>
                                : null
                        }
                        <ul className="navbar-nav">
                            {
                                (this.props.additionalItems != null && this.props.additionalItems.length > 0)
                                    ? this.props.additionalItems
                                    : null
                            }
                            <li className="nav-item dropdown noselect" draggable={false}>
                                <BaseFloatingActionButton
                                    keyString="LanguageDropdownFloatingActionButton"
                                    tooltipText={i18next.t(LocaleKey.appLanguage)}
                                    icon={<i className="material-icons">language</i>}
                                    onClick={this.showLangDropdown}
                                />
                                <div className={classNames('dropdown-menu dropdown-menu-right noselect', { 'show': this.state.langDropdownVisible })} draggable={false}>
                                    {
                                        this.state.localeMap.map((locale: LocalizationMap) => {
                                            return (
                                                <span onClick={() => this.selectLanguage(locale)} key={locale.code}
                                                    className="dropdown-item pointer">{locale.name}
                                                </span>
                                            );
                                        })
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUnconnected);