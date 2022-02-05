import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DrawerMenuItem } from '../../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../../contracts/enum/DrawerIconType';
import { getMenuSection1, getMenuSection2, getMenuSection3, getMenuSection4, getMenuSection4Async, getMenuSection5, menuItemSeperator } from '../../../helper/drawerMenuItemsHelper';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { AboutDrawerTilePresenter } from '../../common/about/aboutDrawerTilePresenter';
import { AssistantAppsAboutDrawerTilePresenter } from '../../common/about/assistantAppsAboutDrawerTilePresenter';
import { mapDispatchToProps, mapStateToProps } from './drawer.Redux';

interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj { }

interface IFromRedux {
    selectedLanguage: string;
    toggleMenu: () => void;
}

interface IProps extends IFromRedux, IWithDepInj, IWithoutDepInj { }


const DrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();
    const [expandedMenuItems, setExpandedMenuItems] = useState<Array<string>>([]);
    const [menuItems, setMenuItems] = useState<Array<DrawerMenuItem>>([
        ...getMenuSection1(),
        ...getMenuSection2(),
        ...getMenuSection3(),
        ...getMenuSection4(),
        ...getMenuSection5(),
    ]);

    useEffect(() => {
        getMenuItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMenuItems = async () => {
        const menuSection4Items = await getMenuSection4Async(props.gameItemService);
        const localMenuItems = [
            ...getMenuSection1(),
            ...getMenuSection2(),
            ...getMenuSection3(),
            ...menuSection4Items,
            ...getMenuSection5(),
        ];
        setMenuItems(localMenuItems);
    }

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

    const renderMenuItemChild = (menuItem: DrawerMenuItem, icon: any, isActive: boolean): ReactNode => {

        if (menuItem.link.includes('http')) {
            return (
                <a onClick={menuItemClick} href={menuItem.link} target="_blank" rel="noopener noreferrer" className="nav-link">{icon}<p>{menuItem.name}</p></a>
            );
        }

        if (!isActive) {
            return (
                <Link onClick={menuItemClick} to={menuItem.link} className="nav-link" draggable={false}>{icon}<p>{menuItem.name}</p></Link>
            );
        }

        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={menuItemClick} href="#" className="nav-link" draggable={false}>{icon}<p>{menuItem.name}</p></a>
        );
    }

    const renderMenuItem = (pathname: string) => (menuItem: DrawerMenuItem, index: number) => {
        const isActive = pathname === menuItem.link;
        const classes = classNames('nav-item', {
            active: isActive,
            separator: menuItem.isSeparator
        });

        if (menuItem.isSeparator) return <li className={classes} key={`seperator-${index}`}></li>;

        let icon: any = null;
        if (menuItem.iconType === DrawerIconType.Material) icon = <i key={menuItem.icon} className="material-icons">{menuItem.icon}</i>;
        if (menuItem.iconType === DrawerIconType.Custom) icon = <img key={menuItem.icon} className="custom-icons" src={menuItem.icon} alt={menuItem.icon} />;

        const child = renderMenuItemChild(menuItem, icon, isActive);

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

    const renderMenuItems = (menuItems: Array<DrawerMenuItem>) =>
        menuItems.map(renderMenuItem(location.pathname));

    return (
        <div key={`drawer-menu-${props.selectedLanguage}`}
            className={classNames('sidebar noselect', props.selectedLanguage)}>
            <div className="sidebar-wrapper ps-theme-default">
                <ul className="nav">
                    <div className="logo">
                        <Link to="/" draggable={false}><img src="/assets/images/DrawerHeader.png" draggable={false} alt="drawerHeader" /></Link>
                    </div>
                    {renderMenuItems(menuItems ?? [])}
                    <AssistantAppsAboutDrawerTilePresenter />
                    {renderMenuItems([menuItemSeperator])}
                    <br />
                    <AboutDrawerTilePresenter />
                </ul>
            </div>
        </div>
    );
};

export const Drawer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(DrawerUnconnected),
    (services: IDependencyInjection) => ({
        apiService: services.apiService,
        gameItemService: services.gameItemService,
    })
);
