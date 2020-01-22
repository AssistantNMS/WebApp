import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './navbar.Redux';

import { LocalizationMap } from '../../../localization/LocalizationMap';
import { localeMap } from '../../../localization/Localization';

interface IProps {
    title: string;
    isDark?: boolean;
    setDarkMode?: (isDark: boolean) => void;
    setLanguage?: (langCode: string) => void;
    toggleMenu?: () => void;
}

interface IState {
    showSearch: boolean;
    langDropdownVisible: boolean,
    localeMap: LocalizationMap[]
}

class NavBarUnconnected extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            showSearch: false,
            langDropdownVisible: false,
            localeMap: localeMap
        }
    }

    menuItemClick = () => {
        if (this.props.toggleMenu != null) {
            this.props.toggleMenu();
        }
    }

    darkModeToggle = () => {
        if (this.props.setDarkMode != null) {
            this.props.setDarkMode(!this.props.isDark);
        }
    }

    searchBarToggle = () => {
        this.setState((prevState: IState) => {
            return {
                showSearch: !prevState.showSearch
            }
        });
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
            <>
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
                            <span className="navbar-brand">{this.props.title}</span>
                        </div>
                        <div className="navbar-collapse justify-content-end">
                            {
                                this.state.langDropdownVisible
                                    ? <div onClick={this.showLangDropdown} className="full-page-loader opacity80"></div>
                                    : null
                            }
                            <ul className="navbar-nav">
                                <li className="nav-item" onClick={this.searchBarToggle}>
                                    <span className="nav-link pointer">
                                        <i className="material-icons">search</i>
                                    </span>
                                </li>
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
                                </li>
                                <li className="nav-item" onClick={this.darkModeToggle}>
                                    <span className="nav-link pointer">
                                        <i className="material-icons">{
                                            this.props.isDark
                                                ? 'brightness_high'
                                                : 'brightness_4'
                                        }
                                        </i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {
                    this.state.showSearch
                        ? <div id="searchBar" className="searchbar">
                            <input type="text" />
                        </div>
                        : null
                }
            </>
        );
    }
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUnconnected);