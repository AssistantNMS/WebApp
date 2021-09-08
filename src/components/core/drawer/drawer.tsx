import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/drawerMenuItemsHelper';

import { mapStateToProps, mapDispatchToProps } from './drawer.Redux';
import i18next from 'i18next';
import { LocaleKey } from '../../../localization/LocaleKey';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
    toggleMenu?: () => void;
}

export const DrawerUnconnected = withRouter((props: IProps) => {
    const baseItems = getDrawerMenuItems();
    const menuItems = baseItems.concat(menuItemSeperator);

    const menuItemClick = () => {
        if (props.toggleMenu != null) {
            props.toggleMenu();
        }
    }

    const renderMenuItems = (menuItems: DrawerMenuItem[]) => {
        const { pathname } = props.location;

        return menuItems.map((item: DrawerMenuItem, index: number) => {
            const classes = classNames('nav-item noselect', {
                active: pathname === item.link,
                separator: item.isSeparator
            });

            if (item.isSeparator) return <li className={classes} key={`seperator-${index}`}></li>;

            let icon: any = null;
            if (item.iconType === DrawerIconType.Material) icon = <i className="material-icons">{item.icon}</i>;
            if (item.iconType === DrawerIconType.Custom) icon = <img className="custom-icons" src={item.icon} alt={item.icon} />;

            var child = item.link.includes('http')
                ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="nav-link noselect">{icon}<p>{item.name}</p></a>
                : <Link to={item.link} className="nav-link noselect" draggable={false}>{icon}<p>{item.name}</p></Link>

            return (
                <li onClick={menuItemClick} key={`${item.link}-${index}`}
                    className={classes} draggable={false}>
                    {child}
                </li>
            );
        });
    }

    const versionString = i18next.t(LocaleKey.appVersion).replace('{0}', process.env.REACT_APP_VERSION ?? '');
    const gameVersionString = i18next.t(LocaleKey.gameVersion).replace('{0}', '3.63');

    return (
        <div
            className={classNames('sidebar', props.selectedLanguage)}>
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo noselect">
                        <Link to="/" draggable={false}><img src="/assets/images/DrawerHeader.png" draggable={false} alt="drawerHeader" /></Link>
                    </div>
                    {
                        renderMenuItems(menuItems)
                    }
                    <br />
                    <div className="noselect"
                        style={{ textAlign: 'center', padding: '.5em .5em 0 .5em' }}
                        data-version={require('../../../buildName.json')}>
                        {versionString}
                    </div>
                    <div className="noselect"
                        style={{ textAlign: 'center' }}>
                        {gameVersionString}
                    </div>
                </ul>
            </div>
        </div>
    );
});

export const Drawer = connect(mapStateToProps, mapDispatchToProps)(DrawerUnconnected);
