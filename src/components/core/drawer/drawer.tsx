import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/DrawerMenuItemsHelper';

import { mapStateToProps, mapDispatchToProps } from './drawer.Redux';

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
            const classes = classNames('nav-item', {
                active: pathname === item.link,
                separator: item.isSeparator
            });

            if (item.isSeparator) return <li className={classes} key={`seperator-${index}`}></li>;

            let icon: any = null;
            if (item.iconType === DrawerIconType.Material) icon = <i className="material-icons">{item.icon}</i>;
            if (item.iconType === DrawerIconType.Custom) icon = <img className="custom-icons" src={item.icon} alt={item.icon} />;
            return (
                <li onClick={menuItemClick} key={`${item.link}-${index}`}
                    className={classes}>
                    <Link to={item.link} className="nav-link">
                        {icon}
                        <p>{item.name}</p>
                    </Link>
                </li>
            );
        });
    }

    return (
        <div
            className={classNames('sidebar', props.selectedLanguage)}>
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo">
                        <img src="/assets/images/DrawerHeader.png" alt="drawerHeader" />
                    </div>
                    {
                        renderMenuItems(menuItems)
                    }
                    <br />
                    <div style={{ textAlign: 'center', padding: '.5em' }} data-version={require('../../../buildName.json')}>Version: {process.env.REACT_APP_VERSION}</div>
                </ul>
            </div>
        </div>
    );
});

export const Drawer = connect(mapStateToProps, mapDispatchToProps)(DrawerUnconnected);
