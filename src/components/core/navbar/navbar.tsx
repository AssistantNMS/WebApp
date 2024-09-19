import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { localeMap } from '../../../localization/Localization';
import { LocalizationMap } from '../../../localization/LocalizationMap';
import { translate } from '../../../localization/Translate';
import { BaseFloatingActionButton } from '../../floatingActionButton/baseFloatingActionButton';
import { LanguageListTile } from '../../tilePresenter/languageTilePresenter';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './navbar.Redux';

interface IWithDepInj { }
interface IWithoutDepInj {
  title: string;
  additionalItems?: Array<JSX.Element>;
}

interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

const NavBarUnconnected: React.FC<IProps> = (props: IProps) => {
  const [langDropdownVisible, setLangDropdownVisible] = useState<boolean>(false);

  const menuItemClick = () => {
    if (props.toggleMenu != null) {
      props.toggleMenu();
    }
  };

  const showLangDropdown = () => setLangDropdownVisible(!langDropdownVisible);

  const selectLanguage = (locale: LocalizationMap) => {
    if (props.setLanguage != null) {
      props.setLanguage(locale.code);
    }
    setLangDropdownVisible(false);
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler pointer"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={menuItemClick}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
        </button>
        <div className="navbar-wrapper">
          <span className="navbar-brand noselect">{props.title}</span>
        </div>
        <div className="navbar-collapse justify-content-end">
          {langDropdownVisible ? <div onClick={showLangDropdown} className="full-page-loader opacity80"></div> : null}
          <ul className="navbar-nav">
            {props.additionalItems != null && props.additionalItems.length > 0
              ? props.additionalItems.map((child, index) => (
                <li key={`additionalItems: ${index}`} data-id={`additionalItems: ${index}`}>
                  {child}
                </li>
              ))
              : null}
            <li className="nav-item dropdown noselect" draggable={false}>
              <BaseFloatingActionButton
                keyString="LanguageDropdownFloatingActionButton"
                tooltipText={translate(LocaleKey.appLanguage)}
                icon={
                  <i className="material-icons" title="change language">
                    language
                  </i>
                }
                onClick={showLangDropdown}
              />
              <div className={classNames('dropdown-menu dropdown-menu-right noselect', { show: langDropdownVisible })} draggable={false}>
                {localeMap
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((locale: LocalizationMap) => (
                    <LanguageListTile key={`${locale.countryCode}-${locale.code}`} onClick={() => selectLanguage(locale)} {...locale} />
                  ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const NavBar = withServices<IWithoutDepInj, IWithDepInj>(connect(mapStateToProps, mapDispatchToProps)(NavBarUnconnected), () => ({}));
