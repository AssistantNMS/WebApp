import classNames from 'classnames';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/drawerMenuItemsHelper';
import { AboutDrawerTilePresenter } from '../../common/about/aboutDrawerTilePresenter';
import { AssistantAppsAboutDrawerTilePresenter } from '../../common/about/assistantAppsAboutDrawerTilePresenter';
import { mapDispatchToProps, mapStateToProps } from './drawer.Redux';

interface IFromRedux {
    selectedLanguage: string;
    toggleMenu: () => void;
}

interface IProps extends IFromRedux {
    location: any;
    match: any;
    history: any;
}

const DrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [expandedMenuItems, setExpandedMenuItems] = useState<Array<string>>([]);

    const menuItems = getDrawerMenuItems();

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
        const classes = classNames('nav-item', {
            active: pathname === menuItem.link,
            separator: menuItem.isSeparator
        });

        if (menuItem.isSeparator) return <li className={classes} key={`seperator-${index}`}></li>;

        let icon: any = null;
        if (menuItem.iconType === DrawerIconType.Material) icon = <i className="material-icons">{menuItem.icon}</i>;
        if (menuItem.iconType === DrawerIconType.Custom) icon = <img className="custom-icons" src={menuItem.icon} alt={menuItem.icon} />;

        const child = menuItem.link.includes('http')
            ? <a onClick={menuItemClick} href={menuItem.link} target="_blank" rel="noopener noreferrer" className="nav-link">{icon}<p>{menuItem.name}</p></a>
            : <Link onClick={menuItemClick} to={menuItem.link} className="nav-link" draggable={false}>{icon}<p>{menuItem.name}</p></Link>

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

    const renderMenuItems = (menuItems: Array<DrawerMenuItem>) => {
        const { pathname } = props.location;

        return menuItems.map(renderMenuItem(pathname));
    }

    return (
        <div
            className={classNames('sidebar noselect', props.selectedLanguage)}>
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo">
                        <Link to="/" draggable={false}><img src="/assets/images/DrawerHeader.png" draggable={false} alt="drawerHeader" /></Link>
                    </div>
                    {renderMenuItems(menuItems)}
                    <AssistantAppsAboutDrawerTilePresenter />
                    {renderMenuItems([menuItemSeperator])}
                    <br />
                    <AboutDrawerTilePresenter />
                </ul>
            </div>
        </div>
    );
};

export const Drawer: any = connect(mapStateToProps, mapDispatchToProps)(withRouter(DrawerUnconnected));