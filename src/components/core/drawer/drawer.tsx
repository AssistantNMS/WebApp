import React from 'react';

import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/DrawerMenuItemsHelper';
import { getCatalogueMenuItems } from '../../../helper/CatalogueMenuItemsHelper';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

interface IProps {
    location: any;
    match: any;
    history: any;
}

export const DrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const baseItems = getDrawerMenuItems();
    const catalogueItems = getCatalogueMenuItems();

    const menuItems = baseItems.concat(catalogueItems);
    menuItems.push(menuItemSeperator);

    const menuItemClick = () => {
        const htmlTag = document.querySelector('html');
        if (htmlTag != null) {
            htmlTag.classList.toggle('nav-open');
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
        <div className="sidebar">
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo">
                        <img src={require('../../../assets/images/DrawerHeader.png')} alt="drawerHeader" />
                    </div>
                    {
                        renderMenuItems(menuItems)
                    }
                    <div style={{ textAlign: 'center', padding: '.5em' }}>{require('../../../buildName.json')}</div>
                </ul>
            </div>
        </div>
    );
}

export const Drawer = withRouter(DrawerUnconnected);
