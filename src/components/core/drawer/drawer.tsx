import React, { useState } from 'react';
import i18next from 'i18next';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { LocaleKey } from '../../../localization/LocaleKey';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/drawerMenuItemsHelper';
import { mapStateToProps, mapDispatchToProps } from './drawer.Redux';
import * as metaJson from '../../../assets/data/meta.json';
import { CustomTooltip } from '../../common/tooltip/tooltip';

interface IProps {
    location: any;
    match: any;
    history: any;
    selectedLanguage?: string;
    toggleMenu?: () => void;
}

export const DrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [expandedMenuItems, setExpandedMenuItems] = useState<Array<string>>([]);

    const baseItems = getDrawerMenuItems();
    const menuItems = baseItems.concat(menuItemSeperator);

    const menuItemClick = () => {
        if (props.toggleMenu != null) {
            props.toggleMenu();
        }
    }

    const toggleSubMenu = (id: string) => () => {
        const isExpanded = expandedMenuItems.includes(id);
        if (isExpanded) {
            const newList = [...expandedMenuItems].filter(ci => ci !== id);
            setExpandedMenuItems([...newList])
        } else {
            setExpandedMenuItems([...expandedMenuItems, id])
        }
    }

    const renderMenuItem = (pathname: string) => (menuItem: DrawerMenuItem, index: number) => {
        const classes = classNames('nav-item noselect', {
            active: pathname === menuItem.link,
            separator: menuItem.isSeparator
        });

        if (menuItem.isSeparator) return <li className={classes} key={`seperator-${index}`}></li>;

        let icon: any = null;
        if (menuItem.iconType === DrawerIconType.Material) icon = <i className="material-icons">{menuItem.icon}</i>;
        if (menuItem.iconType === DrawerIconType.Custom) icon = <img className="custom-icons" src={menuItem.icon} alt={menuItem.icon} />;

        const child = menuItem.link.includes('http')
            ? <a onClick={menuItemClick} href={menuItem.link} target="_blank" rel="noopener noreferrer" className="nav-link noselect">{icon}<p>{menuItem.name}</p></a>
            : <Link onClick={menuItemClick} to={menuItem.link} className="nav-link noselect" draggable={false}>{icon}<p>{menuItem.name}</p></Link>

        const subMenuIsExpanded = expandedMenuItems.includes(menuItem.icon);
        const subMenuIconClasses = classNames('material-icons x2 pointer align-right', { 'rotate180': subMenuIsExpanded });
        return (
            <li key={`${menuItem.link}-${index}`}
                className={classes} draggable={false}>
                {child}
                {
                    ((menuItem?.subs?.length ?? 0) > 0) &&
                    (
                        <>
                            <i className={subMenuIconClasses} onClick={toggleSubMenu(menuItem.icon)}>expand_more</i>
                            <ul className={classNames('nav', 'sub', { expanded: subMenuIsExpanded })}>
                                {renderMenuItems(menuItem.subs!)}
                            </ul>
                        </>
                    )
                }
            </li>
        );
    }

    const renderMenuItems = (menuItems: DrawerMenuItem[]) => {
        const { pathname } = props.location;

        return menuItems.map(renderMenuItem(pathname));
    }

    const versionString = i18next.t(LocaleKey.appVersion).replace('{0}', process.env.REACT_APP_VERSION ?? '');
    const gameVersionString = i18next.t(LocaleKey.gameVersion).replace('{0}', metaJson.GameVersion);
    const gameVersionGeneratedDate = metaJson.GeneratedDate;

    return (
        <div
            className={classNames('sidebar', props.selectedLanguage)}>
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo noselect">
                        <Link to="/" draggable={false}><img src="/assets/images/DrawerHeader.png" draggable={false} alt="drawerHeader" /></Link>
                    </div>
                    {renderMenuItems(menuItems)}
                    <br />
                    <div className="noselect"
                        style={{ textAlign: 'center', padding: '.5em .5em 0 .5em' }}
                        data-version={require('../../../buildName.json')}>
                        {versionString}
                    </div>
                    <CustomTooltip tooltipText={gameVersionGeneratedDate} position="top-start" theme="light">
                        <div className="noselect"
                            style={{ textAlign: 'center' }}>
                            {gameVersionString}
                        </div>
                    </CustomTooltip>
                </ul>
            </div>
        </div>
    );
};

export const Drawer = connect(mapStateToProps, mapDispatchToProps)(withRouter(DrawerUnconnected));
