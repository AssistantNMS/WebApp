import React from 'react';
import i18next from 'i18next';

import { LocalizationMap } from '../../../localization/LocalizationMap';
import { localeMap } from '../../../localization/Localization';
import classNames from 'classnames';

interface IProps {
    title: string;
}

interface IState {
    isDark: boolean;
    langDropdownVisible: boolean,
    localeMap: LocalizationMap[]
}

export class NavBar extends React.PureComponent<IProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isDark: false,
            langDropdownVisible: false,
            localeMap: localeMap
        }
    }

    menuItemClick = () => {
        //   this.$root.$emit(EventBusType.MenuButtonClick);
    }

    darkModeToggle = () => {
        this.setState((prevState: IState) => {
            return {
                isDark: !prevState.isDark
            }
        });
        //   this.$root.$emit(EventBusType.darkModeToggle, this.isDark);
    }

    showLangDropdown = () => {
        this.setState((prevState: IState) => {
            return {
                langDropdownVisible: !prevState.langDropdownVisible
            }
        });
    }

    selectLanguage = (locale: LocalizationMap) => {
        i18next.changeLanguage(locale.code);
        this.setState((prevState: IState) => {
            return {
                langDropdownVisible: false
            }
        });
        // this.$root.$emit(EventBusType.languageChange);
    }

    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <button className="navbar-toggler pointer" type="button" data-toggle="collapse" aria-controls="navigation-index"
                        aria-expanded="false" aria-label="Toggle navigation" onClick={this.menuItemClick}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                    </button>
                    <div className="navbar-wrapper">
                        <span className="navbar-brand">{this.props.title}</span>
                    </div>
                    <div className="navbar-collapse justify-content-end">
                        {
                            this.state.langDropdownVisible
                                ? <div onClick={this.showLangDropdown} className="full-page-loader opacity80"></div>
                                : null
                        }
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <span className="nav-link pointer" onClick={this.showLangDropdown}>
                                    <i className="material-icons">language</i>
                                </span>
                                <div className={classNames('dropdown-menu dropdown-menu-right', { 'show': this.state.langDropdownVisible })}>
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
                            </li >
                            <li className="nav-item" onClick={this.darkModeToggle}>
                                <span className="nav-link pointer">
                                    <i className="material-icons">{
                                        this.state.isDark
                                            ? 'brightness_high'
                                            : 'brightness_4'
                                    }
                                    </i>
                                </span>
                            </li>
                        </ul >
                    </div >
                </div >
            </nav >
        );
    }
}
