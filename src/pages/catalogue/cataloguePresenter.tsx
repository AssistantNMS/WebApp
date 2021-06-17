import i18next from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../contracts/enum/DrawerIconType';
import { getCatalogueMenuItems } from '../../helper/catalogueMenuItemsHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import './catalogue.scss';



export const CataloguePresenter: React.FC = () => {
    const menuItems = getCatalogueMenuItems();

    const renderIcon = (item: DrawerMenuItem) => {
        if (item.iconType === DrawerIconType.Material) return (<i className="material-icons">{item.icon}</i>);
        if (item.iconType === DrawerIconType.Custom) return (<img className="custom-icons" src={item.icon} alt={item.icon} />);

        return null;
    }

    const title = i18next.t(LocaleKey.catalogue);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="catalogue-container">
                        {
                            menuItems.map((item) => {
                                return (
                                    <div className="catalogue-item noselect" key={item.name}>
                                        <Link to={item.link} className="nav-link">
                                            {
                                                renderIcon(item)
                                            }
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}