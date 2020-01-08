import React from 'react';
import update from 'immutability-helper';

import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getDrawerMenuItems, menuItemSeperator } from '../../../helper/DrawerMenuItemsHelper';
import { getCatalogueMenuItems } from '../../../helper/CatalogueMenuItemsHelper';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export class Drawer extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            menuItems: this.getAllDrawerMenuItems(),
            appVersion: require('../../../buildName.json'),
        };
    }

    getAllDrawerMenuItems = (): Array<DrawerMenuItem> => {
        const baseItems = getDrawerMenuItems();
        const catalogueItems = getCatalogueMenuItems();

        const combined = baseItems.concat(catalogueItems);
        combined.push(menuItemSeperator);
        return combined;
    }

    menuItemClick = () => {
        const htmlTag = document.querySelector('html');
        if (htmlTag != null) {
            htmlTag.classList.toggle('nav-open');
        }
    }

    toggleMenuItemIsActive = (links: Array<string>): void => {
        let state = update(this.state.menuItems, {});
        for (let itemIndex = 0; itemIndex < state.length; itemIndex++) {
            const item = state[itemIndex];
            state = update(state, {
                [itemIndex]: {
                    isActive: { $set: links.includes(item.link) }
                }
            });
        }
        this.setState(() => {
            return {
                menuItems: state
            }
        });
    }

    reTranslateDrawerItems = (newMenuItems: Array<DrawerMenuItem>) => {
        for (
            let menuItemIndex = 0;
            menuItemIndex < this.state.menuItems.length;
            menuItemIndex++
        ) {
            const isActive = this.state.menuItems[menuItemIndex].isActive;
            newMenuItems[menuItemIndex].isActive = isActive;
        }
        this.setState(() => {
            return {
                menuItems: newMenuItems
            }
        });
    }

    renderMenuItem = (item: DrawerMenuItem) => {
        const classes = classNames('nav-item', {
            active: item.isActive,
            separator: item.isSeparator
        });

        if (item.isSeparator) return <li className={classes}></li>;

        let icon = null;
        if (item.iconType === DrawerIconType.Material) icon = <i className="material-icons">{item.icon}</i>;
        if (item.iconType === DrawerIconType.Custom) icon = <img className="custom-icons" src={item.icon} alt={item.icon} />;

        return (
            <li onClick={this.menuItemClick}
                className={classes}>
                <Link to={item.link} className="nav-link">
                    {icon}
                    <p>{item.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-wrapper ps-theme-default">
                    <ul className="nav">
                        <div className="logo">
                            <img src={require('../../../assets/images/DrawerHeader.png')} alt="drawerHeader" />
                        </div>
                        {
                            this.state.menuItems.map((item: DrawerMenuItem) => {
                                return this.renderMenuItem(item);
                            })
                        }
                        <div style={{ textAlign: 'center', padding: '.5em' }}>{this.state.appVersion}</div>
                    </ul>
                </div>
            </div>
        );
    };
}
